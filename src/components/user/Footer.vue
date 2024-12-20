<template>
  <div id="footer" class="footer">
    <div class="footer-container">
      <!-- Office Section -->
      <div class="footer-section">
        <h3>Офис:</h3>
        <p>{{address}}</p>
        <img src="/images/homepage.svg" alt="Realsoft Logo">
      </div>
      <!-- Contact Section -->
      <div class="footer-section">
        <h3>Контакт:</h3>
        <p>{{phone}}</p>
        <div class="social-icons">
          <template v-if="socialMedia.length">
            <a
                v-for="social in socialMedia"
                :key="social.id"
                :href="social.url"
                target="_blank"
                :title="social.name"
                rel="noopener noreferrer"
            ><i :class="social.class"></i>
            </a>
          </template>
          <p v-else>Loading...</p>
        </div>
      </div>
      <!-- Email Section -->
      <div class="footer-section">
        <h3>Электронная почта:</h3>
        <p>{{email}}</p>
      </div>
      <!-- Services Section -->
      <div class="footer-section">
        <h3>Услуги:</h3>
        <p v-for="(service,index) in Services" :key="index">
          {{service}}
        </p>
      </div>
    </div>
    <!-- Footer Bottom -->
    <div class="footer-bottom">
      <p>© 2024 Все права защищены</p>
      <p>Разработан: <span>Online Service Group</span></p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const socialMedia = ref([]);
const phone = ref();
const email = ref();
const address = ref();
const Services = ref([]);
const fetchSocialMedia = async () => {
  try {
    const response = await axios.get("/get-social-media");
    socialMedia.value = response.data.data;
  } catch (error) {
    console.error("Failed to fetch social media links:", error);
  }
};
const fetchContact = async ()=>{
  try{
    const response = await axios('/get-contact');
    const contacts = response.data.data[0];
    phone.value = contacts.phone;
    email.value = contacts.email;
    address.value = contacts.address;
    // console.log(phone.value)
  }catch (error){
    console.log('error',error)
  }
}
const fetchService = async ()=>{
  try{
    const response = await axios('/get-services');
    Services.value = response.data.data.data.map(service =>service.title);
  }catch (error){
    console.log('error',error)
  }
}
onMounted(()=>{
  fetchSocialMedia();
  fetchContact();
  fetchService();
});
</script>

<style scoped>
.footer {
  background-color: #102C57;
  color: #f5f5f5;
  padding: 40px 90px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.footer-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.footer-section h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #BECADD;
}

.footer-section p {
  font-size: 14px;
  line-height: 1.6;
}

.footer-section img {
  margin-top: 10px;
  width: 120px;
  height: auto;
}

/* Social Icons */
.social-icons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.social-icons i{
  color: #95C6F9;
  border: none;
  border-radius: 10px;
  padding: 10px;
  background-color: #1d519f;

}
.social-icons i:hover{
  scale: 1.05;
}


/* Footer Bottom */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #444;
  padding-top: 20px;
  font-size: 14px;
}

.footer-bottom span {
  color: #fff;
  font-weight: bold;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .footer-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .footer-section {
    margin-bottom: 20px;
  }
  .social-icons {
    justify-content: center;
  }
  .footer-bottom {
    flex-direction: column;
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 20px 10px;
  }

  .footer-section img {
    width: 100px;
  }
  .social-icons img {
    width: 25px;
    height: 25px;
  }
}
</style>
