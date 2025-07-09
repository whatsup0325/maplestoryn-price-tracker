<template>
  <div class="layout-root light-bg">
    <header class="topbar glass-light">
      <div class="logo-title" style="margin-left: 20px;">
        <img src="/icon.png" alt="logo" class="logo" style="width: 30px; height: 30px;">
        <span class="title">MapleStoryN Price Tracker</span>
      </div>
      <!-- 右側可加選單或按鈕 -->
      <div class="github-star" style="margin-right: 12px;">
        <a href="https://github.com/whatsup0325/maplestoryn-price-tracker" target="_blank" rel="noopener"
          class="github-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"
            style="vertical-align: middle;">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        </a>
      </div>
      <!-- <div class="sponsor-btn-wrap" style="margin-right: 12px;">
        <button class="sponsor-btn" @click="showSponsor()">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"
            style="vertical-align: middle; margin-top: 2px;">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
        <Dialog v-model:visible="sponsorVisible" modal header="Sponsor" :style="{ width: '350px' }">
          <div style="text-align: center;">
            <div style="font-size: 1.1rem; margin-bottom: 12px;">Thank you for your support!</div>
            <div style="font-size: 0.95rem; color: #64748b; margin-bottom: 8px;">Wallet address:</div>
            <div
              style="font-family: monospace; font-size: 1rem; background: #f1f5f9; padding: 8px 12px; border-radius: 6px; word-break: break-all;">
              0x1234abcd5678efgh9012ijkl3456mnop7890qrst</div>
          </div>
        </Dialog>
      </div> -->
    </header>
    <main class="main-content">
      <router-view />
    </main>
    <footer class="footer-light">
      &copy; 2025 MapleStoryN Price Tracker
      <div class="footer-contact">
        Contact: <a href="mailto:whatsup0325@gmail.com" class="footer-link">whatsup0325@gmail.com</a>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Dialog from 'primevue/dialog';

const sponsorVisible = ref(false);
function showSponsor() {
  sponsorVisible.value = true;
}
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

.github-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #24292f;
  color: #fff;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 1.1rem;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
  border: none;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.04);
  padding: 0;
}

.github-btn:hover {
  background: #57606a;
}

.sponsor-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #e11d48;
  color: #fff;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 1.1rem;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
  border: none;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.04);
  padding: 0;
  cursor: pointer;
}

.sponsor-btn:hover {
  background: #be185d;
}

.footer-contact {
  margin-top: 4px;
  font-size: 0.85em;
}

.footer-link {
  color: #2563eb;
  text-decoration: underline;
  margin-left: 4px;
}

.footer-link:hover {
  color: #1d4ed8;
}
</style>