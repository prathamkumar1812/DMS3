import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import Components from 'unplugin-vue-components/vite';
import {PrimeVueResolver} from '@primevue/auto-import-resolver';
import { Theme } from '@primeuix/themes';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),tailwindcss({
    darkMode: 'class',
    Theme:{    
    }
  }), Components({
    resolvers: [
      PrimeVueResolver()
    ]
  })],
})
