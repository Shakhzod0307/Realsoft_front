<template>
  <main class="main-container">
    <header class="header">
      <div class="header-left">
        <button type="button" class="menu-btn">
          <i class="bx bx-menu"></i>
        </button>
      </div>
      <div class="profile-container">
        <button type="button" class="profile-btn">
          A
        </button>

        <div class="profile-dropdown">
          <div class="profile-info">
            <img class="profile-img" src="" alt="User Image">
            <div class="profile-name">Admin</div>
          </div>
          <div class="logout-btn-container">
            <form method="POST" action="/logout">
              <button class="logout-btn">
                <svg class="logout-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                <span>Logout</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>

    <div class="container">
      <!-- aside -->
      <aside class="sidebar">
        <button class="sidebar-btn">
          <span class="icon"><i class="bx bx-briefcase"></i></span>
          <span class="btn-text">Services</span>
        </button>
        <button class="sidebar-btn">
          <span class="icon"><i class="bx bx-news"></i></span>
          <span class="btn-text">Blogs</span>
        </button>
        <button class="sidebar-btn">
          <span class="icon"><i class="bx bx-buildings"></i></span>
          <span class="btn-text">Sectors</span>
        </button>
        <button class="sidebar-btn">
          <span class="icon"><i class="fa-brands fa-wpforms"></i></span>
          <span class="btn-text">Forms</span>
        </button>
        <button class="sidebar-btn">
          <span class="icon"><i class="fa-solid fa-award"></i></span>
          <span class="btn-text">Advantages</span>
        </button>
        <button class="sidebar-btn">
          <span class="icon"><i class="fa-solid fa-users"></i></span>
          <span class="btn-text">Teams</span>
        </button>
        <button class="sidebar-btn">
          <span class="icon"><i class="fa-solid fa-handshake"></i></span>
          <span class="btn-text">Partners</span>
        </button>
        <button class="sidebar-btn">
          <span class="icon"><i class="fa-solid fa-chart-line"></i></span>
          <span class="btn-text">Statistics</span>
        </button>
        <button class="sidebar-btn">
          <span class="icon"><i class="fa-solid fa-file-alt"></i></span>
          <span class="btn-text">About</span>
        </button>
        <button class="sidebar-btn">
          <span class="icon"><i class="fa-solid fa-images"></i></span>
          <span class="btn-text">Images</span>
        </button>
        <button class="sidebar-btn">
          <span class="icon"><i class="fa-solid fa-comment-dots"></i></span>
          <span class="btn-text">Texts</span>
        </button>
      </aside>

      <div id="app" class="main-content">
        <slot></slot>
      </div>
    </div>
  </main>
</template>
<script setup>

</script>
<style scoped>

.main-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e2e8f0;
}

.header-left {
  display: flex;
  align-items: center;
}

.menu-btn {
  font-size: 24px;
}

.profile-container {
  position: relative;
}

.profile-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #ff3b3f;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
}

.profile-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  width: 200px;
  z-index: 10;
}

.profile-info {
  display: flex;
  align-items: center;
  padding: 10px;
}

.profile-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-name {
  margin-left: 10px;
  font-weight: 500;
}

.logout-btn-container {
  padding: 10px;
}

.logout-btn {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 16px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #333;
}

.logout-btn:hover {
  background-color: #f1f1f1;
}

.logout-icon {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}


.container {
  display: flex;
  width: 100%;
}

.sidebar {
  width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #ffffff;
  border-right: 1px solid #e2e8f0;
  padding: 16px;
}

.sidebar-btn {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  background-color: transparent;
  margin-bottom: 12px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.sidebar-btn:hover {
  background-color: #f1f1f1;
}

.icon {
  font-size: 20px;
  margin-right: 10px;
}

.btn-text {
  font-size: 16px;
}


.main-content {
  margin-left: 260px;
  width: calc(100% - 260px);
  padding: 16px;
}
</style>
