<template>
  <div class="login-container">
    <div class="form-container">
      <h2 class="title">Sign In</h2>
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      <div v-if="formErrors.length > 0" class="form-errors">
        <ul>
          <li v-for="(err, index) in formErrors" :key="index">{{ err }}</li>
        </ul>
      </div>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="email">Email-Address</label>
          <input
              id="email"
              type="email"
              v-model="email"
              required
              class="input-field"
          />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input
              id="password"
              type="password"
              v-model="password"
              required
              class="input-field"
          />
        </div>
        <div class="remember-forgot">
          <div class="remember-me">
<!--            <input-->
<!--                id="remember_me"-->
<!--                type="checkbox"-->
<!--                v-model="rememberMe"-->
<!--                class="checkbox"-->
<!--            />-->
            <a href="/" class="checkbox-label">Dashboard</a>
          </div>
          <a href="#" class="forgot-password">Forgot your password?</a>
        </div>
        <div class="submit-btn">
          <button type="submit" class="submit-button">
            Sign In
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from "axios";

const email = ref('');
const password = ref('');
const error = ref('');
const formErrors = ref([]);

const handleLogin = async () => {
  formErrors.value = [];
  error.value = '';
  if (!email.value || !password.value) {
    formErrors.value.push('Both fields are required.');
  } else {
      try {
        const response = await axios.post('/login', {email: email.value, password: password.value});
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        window.location.href = '/admin/blogs'
      } catch (err) {
        error.value = 'Login failed.';
      }
  }
};
</script>
<style scoped>

.login-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 1.5rem;
}

@media screen and (min-width: 640px) {
  .login-container {
    padding-top: 0;
  }
}

.form-container {
  width: 100%;
  max-width: 24rem;
  padding: 1.25rem;
  margin: 0 auto;
}

.title {
  margin-bottom: 3rem;
  text-align: center;
  font-size: 3rem;
  font-weight: 800;
}

.error-message {
  margin-bottom: 1rem;
  text-align: center;
  color: #f87171;
  font-weight: 600;
}

.form-errors {
  margin-bottom: 1rem;
}

.form-errors ul {
  color: #f87171;
}

.form-errors li {
  margin-bottom: 0.25rem;
}

.input-group {
  margin-bottom: 1rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.25rem;
}

.input-field {
  padding: 0.5rem 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.375rem;
  margin-top: 0.25rem;
  width: 100%;
}

.input-field:focus {
  border-color: #fca5a5;
  outline: none;
  box-shadow: 0 0 0 2px rgba(252, 165, 165, 0.5);
}

.remember-forgot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
}

.remember-me {
  display: flex;
  align-items: center;
}

.checkbox {
  border: 1px solid #d1d5db;
  color: #ef4444;
}

.checkbox-label {
  font-size: 0.875rem;
  color: #3366ae;
}

.forgot-password {
  font-size: 0.875rem;
  color: #ef4444;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.submit-btn {
  margin-top: 1.5rem;
}

.submit-button {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  text-transform: capitalize;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #dc2626;
}

.submit-button:active {
  background-color: #b91c1c;
}

.submit-button:focus {
  outline: none;
  border-color: #ef4444;
  color: #fca5a5;
}

.submit-button:disabled {
  opacity: 0.5;
}


</style>
