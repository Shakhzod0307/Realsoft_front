<template>
  <div id="footer" class="footer">
    <div class="footer-container">
      <!-- Office Section -->
      <div class="footer-section">
        <h3>Офис:</h3>
        <p>100084, Узбекистан, г. Ташкент, Малая кольцевая дорога, 38/1</p>
        <img src="/images/homepage.svg" alt="Realsoft Logo">
      </div>
      <!-- Contact Section -->
      <div class="footer-section">
        <h3>Контакт:</h3>
        <p>+998 71 205 84-84</p>
        <div class="social-icons">
          <img src="/images/in.svg" alt="LinkedIn">
          <img src="/images/instagram.svg" alt="Instagram">
          <img src="/images/telegram.svg" alt="Telegram">
          <img src="/images/youtube.svg" alt="YouTube">
        </div>
      </div>
      <!-- Email Section -->
      <div class="footer-section">
        <h3>Электронная почта:</h3>
        <p>info@realsoft.co</p>
      </div>
      <!-- Services Section -->
      <div class="footer-section">
        <h3>Услуги:</h3>
        <p>Веб-разработка</p>
        <p>Мобильных приложений</p>
        <p>Разработка фронтенда</p>
        <p>Инжиниринг программных продуктов</p>
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
</script>

<style scoped>
/* General Footer Styling */
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
}

.social-icons img {
  width: 30px;
  height: 30px;
  transition: transform 0.3s ease;
}

.social-icons img:hover {
  transform: scale(1.2);
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
  .social-icons{
    display: unset;
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
