<template>
  <div class="admin-layout">
    <NavSidebar>
<!--      <template v-slot:default><Blogs/></template>-->
      <router-view/>
    </NavSidebar>


  </div>
</template>

<script setup>
import NavSidebar from "@/components/admin/Nav-Sidebar.vue";
import Blogs from "@/components/admin/Blogs.vue";
</script>

<style scoped>

</style>
