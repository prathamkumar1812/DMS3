import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import Aura from '@primeuix/themes/aura';
import PrimeVue from 'primevue/config';
import router from './routers';
import store from './store';
import VueFilesPreview from 'vue-files-preview';
import "vue-files-preview/lib/style.css"
import { Form } from '@primevue/forms';
import ToastService from 'primevue/toastservice';

import 'primeicons/primeicons.css'
import ConfirmationService from 'primevue/confirmationservice';
import axios from 'axios';

// API base setup
axios.defaults.baseURL = 'https://documentmanagementsystem-production-4bd7.up.railway.app/api'; // or your prod URL
axios.defaults.withCredentials = true;

async function bootstrap() {


   const savedTheme = localStorage.getItem('theme') || 'dark';

  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark', 'my-app-dark');
  } else {
    document.documentElement.classList.remove('dark', 'my-app-dark');
  }
  // 1. Wait until user login state is loaded
  await store.dispatch('getCurrentUser');

  // 2. Then create and mount the app
  const app = createApp(App);
  app.use(store);
  app.use(router);
  app.use(PrimeVue, {
    theme: { preset: Aura,
      options: {
        darkModeSelector: '.my-app-dark',
    }
     }
  });
  app.use(ToastService);
  app.use(VueFilesPreview);
  app.use(ConfirmationService)
  app.mount('#app');
}

bootstrap();
