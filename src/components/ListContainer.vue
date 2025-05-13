<template>
    <div class="h-full p-3 rounded-4xl border-2 border-white overflow-hidden">
      <h2 class="m-2 text-3xl">Files</h2>
      
      <!-- Scrollable area -->
      <div class="h-[400px] overflow-y-auto flex flex-col gap-4 no-scrollbar">
         <list-item v-for="item in files" :key="item" :fileName="item.fileName" :fileId="item.fileId" :tags="item.tags" />
        <!-- Example static items -->
        
      </div>
    </div>
  </template>

<script>
import ListItem from './ListItem.vue'
export default {
    components:{
        ListItem
    },
    data(){
        return {
            items:[1,2,3,4,5]
        }
    }
    ,
    computed:{
        files(){
            return this.$store.state.DocFiles.items;
        }
    }
}
</script>

<style>
.no-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
}
.no-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style>
