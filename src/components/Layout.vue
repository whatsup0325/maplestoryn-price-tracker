<template>
  <div class="layout-root light-bg">
    <header class="topbar glass-light">
      <div class="logo-title" style="margin-left: 20px;">
        <img src="/icon.png" alt="logo" class="logo" style="width: 30px; height: 30px;">
        <span class="title">MapleStoryN Price Tracker</span>
      </div>
      <!-- 右側可加選單或按鈕 -->
    </header>
    <main class="main-content">
      <router-view />
    </main>
    <footer class="footer-light">
      &copy; 2025 MapleStoryN Price Tracker
    </footer>
  </div>
</template>

<script setup>
</script>

<style scoped>
.layout-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.light-bg {
  background: #f7fafc;
}

.topbar {
  position: fixed;
  height: 4rem;
  z-index: 997;
  left: 50%;
  top: 10px;
  transform: translateX(-50%);
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1.5rem;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.06);
}

.glass-light {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px) saturate(180%);
  -webkit-backdrop-filter: blur(10px) saturate(180%);
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.03);
}

.logo-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-left: 1rem;
  flex: 1;
}

.title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #22223b;
}

.main-content {
  flex: 1;
  padding-top: 4rem;
}

.footer-light {
  background: #f1f5f9;
  text-align: center;
  padding: 0.5rem;
  font-size: 0.75rem;
  color: #64748b;
  border-top: 1px solid #e5e7eb;
}
</style>