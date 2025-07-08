import { createApp } from 'vue'
import App from './App.vue'
import './tailwind.css'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './router/index.js'

// PrimeVue 相關
import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config';

const router = createRouter({
  history: createWebHistory(),
  routes,
})
const MyPreset = definePreset(Aura, {
  semantic: {
      primary: {
          50: '{surface.50}',
          100: '{surface.100}',
          200: '{surface.200}',
          300: '{surface.300}',
          400: '{surface.400}',
          500: '{surface.500}',
          600: '{surface.600}',
          700: '{surface.700}',
          800: '{surface.800}',
          900: '{surface.900}',
          950: '{surface.950}'
      },
      colorScheme: {
          light: {
              primary: {
                  color: '{primary.950}',
                  contrastColor: '#ffffff',
                  hoverColor: '{primary.800}',
                  activeColor: '{primary.700}'
              },
              highlight: {
                  background: '{primary.950}',
                  focusBackground: '{primary.700}',
                  color: '#ffffff',
                  focusColor: '#ffffff'
              }
          },
          dark: {
              primary: {
                  color: '{primary.50}',
                  contrastColor: '{primary.950}',
                  hoverColor: '{primary.200}',
                  activeColor: '{primary.300}'
              },
              highlight: {
                  background: '{primary.50}',
                  focusBackground: '{primary.300}',
                  color: '{primary.950}',
                  focusColor: '{primary.950}'
              }
          }
      }
  }
});
const app = createApp(App)
app.use(router)

app.use(PrimeVue, {
  ripple: true,  theme: {
      preset: MyPreset,
      options: {
          prefix: 'p',
          darkModeSelector: '.app-dark'
      }
  }
});
app.component('DataView', DataView)

app.mount('#app')
