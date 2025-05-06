<template>
  <div class="w-full h-full flex flex-col justify-center items-center">
   <div><Button v-if="!$store.state.isLogin" @click="$router.push('/login')" label="Login" />
    <Button v-else @click="$router.push('/dashboard')" label="Enter the Docs" /></div>
    <div v-if="$store.state.isLogin" class=" cursor-pointer absolute right-1.5  h-[50px]  top-1.5 flex flex-row items-center"  @click="toggle">
      <Popover ref="op">
               <div>
                  <Button @click="$store.dispatch('logoutUser')">Logout</Button>
               </div>
            </Popover>
      <Avatar :label="Avater" class="mr-2" size="medium" style="background-color: #ece9fc; color: #2a1261" />
      <div class=" min-w-[200px]">{{ $store.state.User.email }}</div>
    </div>
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