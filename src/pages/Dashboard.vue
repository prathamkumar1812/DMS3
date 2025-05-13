<template>
  <div class=" w-full h-screen flex flex-row">
     
    
      
     <div class="w-full  flex flex-col">
        
         <top-bar/>
           <div class="m-3 h-full ">
             <div v-if="isLoading" class=" h-full card flex justify-center items-center">
        <ProgressSpinner />
    </div>
               <list-container v-else/>
           </div>
           <Paginator class="text-white"   :first="first" :rows="rows" :total-records="totalItems" @page="onPage">
         </Paginator> 
           
           

      
    
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
   data(){
      return {
      data: [],      
      first: 0,
      rows: 2,
      isLoading:true
    };
   },
   computed:{
      Avater(){
        const name = this.$store.state.User.name;
         return name ? name.charAt(0).toUpperCase() : '';
      },
      totalItems(){
         return this.$store.getters.totalFiles;
      }
   },
       watch: {
    '$route.query'(to, from) {
      // React to query param changes
      this.fetchData();
    }
  },
      methods:{
         toggle(event) {
            this.$refs.op.toggle(event);
         },
         async onPage(event) {
         const tagsearch = this.$route.query.tagsearch || '';
         if(tagsearch.length){
         this.$router.push(`/dashboard?pageno=${event.page+1}&&tagsearch=${tagsearch}`)
         }
         else{
            this.$router.push(`/dashboard?pageno=${event.page+1}`)
         }
         
        },
     async fetchData() {
        const pageno = this.$route.query.pageno || 1;
        const tagsearch = this.$route.query.tagsearch || '';
        console.log(pageno,tagsearch)
        
      // Fetch data based on pageno and tagsearch
         this.isLoading=true;
          try {
            this.first=(pageno-1)*this.rows
             await this.$store.dispatch("getFilesData",{tag:tagsearch,pageno})  

          } catch (error) {
             console.log(error);
          }
          finally{
             
             this.isLoading=false;  
          }
         
         }
      },
      mounted(){
         this.fetchData();
      }
}
</script>

<style>

</style>