<template>
   
      <div class="w-full h-screen">
        <Toast/>
        <ConfirmDialog></ConfirmDialog>
        <router-view></router-view>
      </div>
    
  </template>
  
  <script>
  import RadialNav from './components/RadialNav.vue';
  
  export default {
    components: {
      RadialNav,
    },
    data() {
      return {
        loading: false,
      };
    },
    methods: {
      load() {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      },
    },
  };
  </script>
  
  <style>
  /* You can add global styles here */
  </style>
  