<template>
  <div id="blog" class="blog-section">
    <p class="title" ref="Title">{{title}}</p>
    <div class="portfolio-container" >
      <p class="text" ref="Text" v-html="heading"></p>
      <p class="all-blog" ref="AllStati">Все статьи<i class="fa-solid fa-angle-right"></i></p>
    </div>
    <div class="blog-grid">
      <div class="blog-item" ref="AllBlogs" v-for="(blog, index) in blogs" :key="index">
        <img :src="`http://localhost:8000${blog.image}`" alt="...">
        <div class="blog-item-text">
          <p><i class="fa-solid fa-calendar-day"></i>{{blog.created_at}}</p>
          <h4>{{blog.title}}</h4>
          <h6>{{blog.text}}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import axios from "axios";
import dayjs from "dayjs";
const blogs = ref([]);
const Title = ref(null);
const Text = ref(null)
const title = ref("")
const heading = ref("")
const AllBlogs = ref([]);
const AllStati = ref(null);
const getBlog = async () => {
  try{
    const response = await axios.get('http://localhost:8000/api/get-blogs');
    blogs.value = response.data.data.data.map((blog) => ({
      ...blog,
      created_at: dayjs(blog.created_at).format("MMMM D, YYYY, HH:mm"),
    }));
    // console.log(response.data.data.data);
  } catch (error) {
    console.error('Error fetching blogs:', error);
  }
}
const fetchText = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/get-texts');
    const texts = response.data.data.filter(text => text.type === 'blog')[0];
    title.value = texts.title;
    heading.value = texts.heading;
    // console.log(texts);
  } catch (error) {
    console.error(error);
  }
};

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

onMounted(async ()=>{
    await getBlog();
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
    if (AllStati.value) {
      const observerAllStati = createObserver(AllStati.value, "animate-all-stati");
      observerAllStati.observe(AllStati.value);
      observers.push(observerAllStati);
    }
    if(AllBlogs.value){
      AllBlogs.value.forEach((blog) => {
        if (blog) {
          const observerBlog = createObserver(blog, "animate-all-blogs");
          observerBlog.observe(blog);
          observers.push(observerBlog);
        }
      })
    }
})

onUnmounted(()=>{
  observers.forEach((observer) => observer.disconnect());
})

</script>

<style scoped>

.title {
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
  opacity: 0;
  transition: opacity 1s ease-out, transform 0.5s ease-out;
  transform: translateX(50px);
}
.title.animate-title{
  opacity: 1;
  transform: translateX(0);
}

.portfolio-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
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
  transition: opacity 1s ease-out, transform 0.5s ease-out;
  transform: translateX(50px);
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

.all-blog {
  cursor: pointer;
  display: flex;
  text-align: center;
  align-items: center;
  font-family: "Museo Sans Cyrl", Arial, sans-serif;
  color: #969FAD;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  opacity: 0;
  transition: opacity 1s ease-out, transform 0.5s ease-out;
  transform: translateX(-80px);
}
.all-blog.animate-all-stati{
  opacity: 1;
  transform: translateX(0);
}
.all-blog i {
  margin-left: 10px;
  transition: margin-left 0.3s;
  padding: 10px;
  border: 1px solid;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
}

.all-blog:hover i {
  background: #969ea5;
  color: #fff;
  margin-left: 15px;
  transition: 0.4s ease-in-out;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.blog-item {
  background-color: #fff;
  border-radius: 15px;
  padding: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  opacity: 0;
  transition: opacity 1s ease-out, transform 1s ease-out;
  transform: translateX(-80px);
}
.blog-item.animate-all-blogs{
  opacity: 1;
  transform: translateX(0);
}
.blog-item:hover {
  transform: translateY(-5px);
}

.blog-item img {
  width: 100%;
  height: auto;
}

.blog-item-text {
  padding: 15px;
}
.blog-section {
  padding: 10px 90px;
}

.blog-item-text p {
  font-size: 14px;
  color: #95a5a6;
  display: flex;
  align-items: center;
  margin: 0 0 10px;
}

.blog-item-text p i {
  margin-right: 10px;
}

.blog-item-text h4 {
  font-size: 18px;
  color: #2c3e50;
  margin: 0 0 10px;
  font-weight: bold;
}

.blog-item-text h6 {
  font-size: 16px;
  color: #7f8c8d;
  margin: 0;
  line-height: 1.5;
}

/* Responsive Design */
@media (max-width: 768px) {
  .portfolio-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .all-blog {
    font-size: 16px;
  }
  .title,
  .text,
  ::v-deep(.text span){
    font-size: 16px ;
  }
  .blog-grid {
    grid-template-columns: 1fr;
  }
  .blog-section {
    padding: 0 20px 5px 20px;
  }
}
</style>