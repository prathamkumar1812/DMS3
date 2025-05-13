<template>
  <div class="w-full h-full flex flex-col justify-center items-center">
   <div><Button v-if="!$store.state.isLogin" @click="$router.push('/login')" label="Login" />
    <Button v-else @click="$router.push('/dashboard')" label="Enter the Docs" /></div>
   
  </div>
</template>

<script>
export default {
    data(){
      return {

      }
    },
    computed:{
      Avater(){
        const name = this.$store.state.User.name;
  return name ? name.charAt(0).toUpperCase() : '';
      }
    },
    
    methods:{
      toggle(event) {
            this.$refs.op.toggle(event);
        },
    }
}
</script>

<style>

</style>