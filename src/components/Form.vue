<template>

  <div id="form" class="form-container" :style="{ backgroundImage: `url(http://localhost:8000${Image})` }">
    <div class="form-section">
      <p class="form-title" id="form-title" ref="Title">{{title}}</p>
      <p class="form-subtitle" id="form-subtitle" ref="Text" v-html="heading"></p>
    </div>
    <div class="form-content">
      <!-- Contact Form -->
      <div>
        <form ref="Form" class="contact-form" @submit.prevent="submitForm">
          <div class="form-row">
            <input
                class="form-input"
                type="text"
                placeholder="Полное имя*"
                v-model="name"
                required
            />
            <input
                class="form-input"
                type="text"
                placeholder="Название компании*"
                v-model="companyName"
                required
            />
            <input
                class="form-input"
                type="text"
                placeholder="Номер телефона*"
                v-model="number"
                required
            />
          </div>
          <div class="form-row">
            <input
                class="form-input"
                type="email"
                placeholder="Электронная почта*"
                v-model="email"
                required
            />
            <input
                class="form-input"
                type="text"
                placeholder="Как мы можем вам помочь?*"
                v-model="message"
                required
            />
            <input
                class="form-input"
                type="file"
                @change="handleFileUpload"
            />
          </div>
          <div class="checkbox-submit">
            <label>
              <input type="checkbox" @click.prevent="ConfirmCheckbox" v-model="privacyAgreement" required />
              Я прочитал <a href="#">Политику конфиденциальности</a> и согласен с ней.
            </label>
            <button type="submit" class="submit-btn">Отправить</button>
          </div>
        </form>

      </div>

      <!-- Contact Information -->
      <div ref="Contact" class="contact-info">
        <h3 class="contact-title" id="contact-title">Или обращайтесь по контактам:</h3>
        <div class="contact-details">
          <p>
            Номер телефона:<br />
            <strong>{{ContactPhone}}</strong>
          </p>
          <p>
            Электронная почта:<br />
            <strong>{{ContactEmail}}</strong>
          </p>
        </div>
        <p>
          Адрес:<br />
          <strong>{{ContactAddress}}</strong>
        </p>
      </div>
    </div>
    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>
  </div>

  <Teleport to="body">
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h3 class="modal-title">Confirm Submission</h3>
        <p class="modal-text">Are you sure you would agree to Policies and Privacy?</p>
        <div class="modal-buttons">
          <button class="modal-button cancel-button" @click="closeModal">Cancel</button>
          <button class="modal-button confirm-button" @click="confirmModal">Confirm</button>
        </div>
      </div>
    </div>
  </Teleport>

</template>
<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import axios from "axios";

const name = ref("");
const companyName = ref("");
const number = ref("");
const email = ref("");
const message = ref("");
const title = ref("");
const heading = ref("");
const file = ref(null);
const privacyAgreement = ref(false);
const Title = ref(null);
const Text = ref(null);
const Form = ref(null);
const Contact = ref(null);
const ContactPhone = ref(null);
const ContactEmail = ref(null);
const ContactAddress = ref(null);
const Image = ref(null);
const successMessage = ref("");
const showModal = ref(false);

const fetchImages = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/get-images');
    const image = response.data.data.data.filter(img => img.type === 'form');
    Image.value = image.find(img =>img.id === 5 ).image;
    // console.log("Image:", Image.value);
  } catch (error) {
    console.error('Error fetching images:', error);
  }
};

const fetchContactInfo = async ()=>{
  try{
    const response = await axios('http://localhost:8000/api/get-contact');
    const All = response.data.data[0];
    ContactPhone.value = All.phone;
    ContactEmail.value = All.email;
    ContactAddress.value = All.address;
    // console.log(All);
  }catch (error){
    console.log('error',error)
  }
}
const fetchText = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/get-texts');
    const texts = response.data.data.filter(text => text.type === 'form')[0];
    title.value = texts.title;
    heading.value = texts.heading;
    // console.log(texts);
  } catch (error) {
    console.error(error);
  }
};
const ConfirmCheckbox = () => {
  if (!privacyAgreement.value) {
    showModal.value = true;
  }
};
const closeModal = () => {
  showModal.value = false;
  privacyAgreement.value = false;
}
const confirmModal = () => {
  showModal.value = false;
  privacyAgreement.value = true;
};

let observers = [];
const createObserver = (element, className) => {
  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(className);
      } else {
        entry.target.classList.remove(className);
      }
    });
  });
};

const handleFileUpload = (event) => {
  file.value = event.target.files[0];
};

const submitForm = async () => {
  try {
    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("company_name", companyName.value);
    formData.append("number", number.value);
    formData.append("email", email.value);
    formData.append("message", message.value);
    if (file.value) {
      formData.append("file", file.value);
    }
    formData.append("privacy_agreement", privacyAgreement.value);
    const response = await axios.post("http://localhost:8000/api/post-form", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    successMessage.value = "Your form has been successfully submitted!";
    // console.log(response.data);
    name.value = "";
    companyName.value = "";
    number.value = "";
    email.value = "";
    message.value = "";
    file.value = null;
    privacyAgreement.value = false;
    setTimeout(() => {
      successMessage.value = "";
    }, 5000);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  nextTick();
  fetchImages();
  fetchContactInfo();
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
  if (Form.value) {
    const observerForm = createObserver(Form.value, "animate-form");
    observerForm.observe(Form.value);
    observers.push(observerForm);
  }
  if (Contact.value) {
    const observerContact = createObserver(Contact.value, "animate-contact");
    observerContact.observe(Contact.value);
    observers.push(observerContact);
  }
});

onUnmounted(() => {
  observers.forEach((observer) => observer.disconnect());
});
</script>



<style scoped>

.form-container {
  padding: 90px 90px;
  border-radius: 15px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.success-message {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #28a745;
  color: white;
  padding: 15px 25px;
  border-radius: 5px;
  font-size: 16px;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  opacity: 0;
  animation: fadeIn 0.5s ease-out forwards;
}

/* Animation for showing success message */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.form-section {
  text-align: start;
  margin-bottom: 40px;
}

.form-title {
  text-transform: uppercase;
  color: #fff;
  display: inline-flex;
  padding: 6px 12px;
  align-items: center;
  gap: 10px;
  border-radius: 40px;
  border: 1px solid #DFE4ED;
  backdrop-filter: blur(5px);
  margin-bottom: 20px;
  opacity: 0;
  transition: opacity 1s ease-out, transform 1s ease-out;
  transform: translateX(90px);
}
.form-title.animate-title{
  opacity: 1;
  transform: translateX(0);
}

.form-subtitle {
  color: #fff;
  font-family: "Museo Sans Cyrl",Arial, sans-serif;
  font-size: 35px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
  padding-bottom: 10px;
  opacity: 0;
  transition: opacity 1s ease-out, transform 0.5s ease-out;
  transform: translateX(90px);
}
.form-subtitle.animate-text{
  opacity: 1;
  transform: translateX(0);
}

::v-deep(.form-subtitle span) {
  text-decoration-line: underline;
}

.form-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
  align-items: stretch;
}

/* Form styling */
.contact-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: opacity 1s ease-out, transform 0.5s ease-out;
  transform: translateX(-50px);
}
.contact-form.animate-form{
  opacity: 1;
  transform: translateX(0);
}

.form-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 15px;
}

.form-input {
  padding: 10px;
  font-size: 14px;
  max-width: 210px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #EFF3F9;
  transition: border-color 0.3s;
}

.form-input:focus {
  border-color: #007bff;
  outline: none;
}


.checkbox-submit {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
}

.checkbox-submit label {
  font-size: 14px;
  color: #555;
}

.checkbox-submit a {
  color: #007bff;
  text-decoration: none;
}

.checkbox-submit a:hover {
  text-decoration: underline;
}

.submit-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #0056b3;
}

/* Contact info styling */
.contact-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: opacity 1s ease-out, transform 0.5s ease-out;
  transform: translateX(50px);
}
.contact-info.animate-contact{
  opacity: 1;
  transform: translateX(0);
}


.contact-title {
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
}

.contact-details {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
}

.contact-details p {
  font-size: 14px;
  color: #555;
  margin: 0;
}

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;
}

/* Modal Container */
.modal {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 400px;
  padding: 24px;
  text-align: center;
}

/* Modal Title */
.modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

/* Modal Text */
.modal-text {
  font-size: 1rem;
  color: #666;
  margin-bottom: 24px;
}

/* Modal Buttons Container */
.modal-buttons {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

/* Buttons */
.modal-button {
  flex: 1;
  padding: 10px 0;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

/* Cancel Button */
.cancel-button {
  background-color: #f3f4f6;
  color: #333;
}

.cancel-button:hover {
  background-color: #e5e7eb;
}

/* Confirm Button */
.confirm-button {
  background-color: #3b82f6;
  color: #fff;
}

.confirm-button:hover {
  background-color: #2563eb;
}




/* Responsive behavior */
@media (max-width: 1024px) {
  .form-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .form-input{
    max-width: 200px;
  }
}

@media (max-width: 768px) {
  .form-input {
    font-size: 12px;
  }

  .submit-btn {
    font-size: 12px;
  }
  .form-row {
    grid-template-columns: 1fr;
  }
  .checkbox-submit label {
    font-size: 12px;
  }
  .form-container{
    padding: 50px 20px;
  }
  .form-title,
  .form-subtitle,
  .form-subtitle span{
    font-size: 24px;
  }
}
@media (max-width: 480px){
  .form-title,
  .form-subtitle,
  .form-subtitle span{
    font-size: 16px;
  }
}

</style>
