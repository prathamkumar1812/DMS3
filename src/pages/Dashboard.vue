<template>
  <div class="w-full h-screen flex flex-row">
   
     <div class="w-full  flex flex-col">
        
         <top-bar/>
           <div class="m-3 h-full ">
               <list-container/>
           </div>
           
           <div class=" cursor-pointer absolute right-1.5  h-[50px]  top-1.5 flex flex-row items-center" @click="toggle">
            <Popover ref="op">
               <div>
                  <Button @click="$store.dispatch('logoutUser')">Logout</Button>
               </div>
            </Popover>
      <Avatar :label="Avater" class="mr-2" size="medium" style="background-color: #ece9fc; color: #2a1261" />
      <div class=" min-w-[200px]">{{ $store.state.User.email }}</div>
    </div>

      
    
     </div>
  </div>
</template>

<script>
import ListContainer from '../components/ListContainer.vue';
import Navbar from '../components/Navbar.vue'
import TopBar from '../components/TopBar.vue';
export default {
   components:{
      Navbar,
      TopBar,
      ListContainer
   },
   computed:{
      Avater(){
        const name = this.$store.state.User.name;
  return name ? name.charAt(0).toUpperCase() : '';
      }},
      methods:{
         toggle(event) {
            this.$refs.op.toggle(event);
        },
      }
}
</script>

<style>

</style>