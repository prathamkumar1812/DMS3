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
        checked:false
      };
    },
    methods: {
      load() {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      },
      toggleTheme(event){
      document.documentElement.classList.toggle('dark');
       document.documentElement.classList.toggle('my-app-dark');

       
      }
    },
  };
  </script>
  
  <style>
  /* You can add global styles here */
  </style>
  