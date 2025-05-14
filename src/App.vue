<template>
   
      <div class="w-full h-screen flex flex-row">
        <Toast/>
        
        <ConfirmDialog :draggable="false"></ConfirmDialog>
        <navbar v-if="$store.state.isLogin"/>
        <div class=" border-l-2 border-white dark:border-black"></div>
        <router-view></router-view>
        <div class=" absolute right-0.5">
          <ToggleButton v-model="checked" @change="toggleTheme" class="w-24 absolute" onLabel="Light" offLabel="Dark"  offIcon="pi pi-moon" onIcon="pi pi-sun" />

        </div>
        
      </div>
      
    
  </template>
  
  <script>
  import Navbar from './components/Navbar.vue';
import RadialNav from './components/RadialNav.vue';
  
  export default {
    components: {
      RadialNav,
       Navbar
    },
    data() {
      return {
        loading: false,
        checked: localStorage.getItem('theme') === 'light', // true = light
      };
    },
    methods: {
      load() {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      },
      toggleTheme() {
      if (this.checked) {
        // User wants light theme
        document.documentElement.classList.remove('dark', 'my-app-dark');
        localStorage.setItem('theme', 'light');
      } else {
        // User wants dark theme
        document.documentElement.classList.add('dark', 'my-app-dark');
        localStorage.setItem('theme', 'dark');
      }
    },
    },
    mounted() {
    // Ensure UI sync if theme is dark
    const isDark = document.documentElement.classList.contains('dark');
    this.checked = !isDark; // Light = true, Dark = false
  },
  };
  </script>
  
  <style>
  /* You can add global styles here */
  </style>
  