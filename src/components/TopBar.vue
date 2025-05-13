<template>
    <div class="w-full flex flex-row pl-4 pr-4 gap-6 items-center justify-center h-[50px] mt-2">
      <!-- Search Bar -->
      <form @submit.prevent="refreshFiles"  class="flex w-[30%] flex-row justify-center items-center rounded-2xl p-2 gap-2 border"> 
            <input placeholder="Search by Tag" v-model="search" class="border-none pl-2 w-full outline-none" type="text" name="search" />
            <button class=""  type="submit">🔍</button>     
    </form>
  
      <!-- Upload Button + Dialog -->
      <div class="card flex justify-center">
        <Button label="Upload File" @click="visible = true" />
  
        <Dialog  v-model:visible="visible" modal header="Upload File" :style="{ width: '25rem' }">
          <span class="text-surface-500 dark:text-surface-400 block mb-4">
            Select a file to upload and add tags.
          </span>
  
          <!-- Tags Input -->
          <div class="mb-4">
            <label for="tags" class="block text-sm mb-1">Tags:</label>
            <Chips class="w-full" v-model="tags" separator="," placeholder="Enter tags and press enter or comma" />
          </div>
          <div class=" w-full  flex items-center justify-center" v-if="isLoading">
            <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="transparent"
    animationDuration=".5s" aria-label="Custom ProgressSpinner" />
          </div>
          
          <!-- File Upload -->
          <FileUpload
            v-else
            name="demo[]"
            :customUpload="true"
            :fileLimit="1"
            :multiple="false"
            @uploader="onCustomUpload"
            
            :maxFileSize="1000000"
          >
            <template #empty>
              <span>Drag and drop files here to upload.</span>
            </template>
          </FileUpload>
           

        </Dialog>
      </div>
    </div>
  </template>
  
  <script>
  import Chips from 'primevue/chips';
  import FileUpload from 'primevue/fileupload';
  import Dialog from 'primevue/dialog';
  import Button from 'primevue/button';
  import Toast from 'primevue/toast';
  
  export default {
    components: {
      Chips,
      FileUpload,
      Dialog,
      Button,
      Toast
    },
    data() {
      return {
        visible: false,
        tags: [], // Multi-tag input values,
        search:"",
        progress:0,
        isLoading:false
      };
    },
    methods: {
      async onCustomUpload(event) {
        console.log(event)
        this.isLoading=true
        const file = event.files[0];
        if (!file) return;
  
        const formData = new FormData();
        formData.append('file', file);
           console.log(this.tags.value)
        this.tags.forEach(tag => {
  formData.append('Tags', tag);
});


        
  
try {

    await this.$store.dispatch("Upload",{formData,
      onUploadProgress: (progressEvent) => {
        if (progressEvent.lengthComputable) {
          this.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        }
      }
 } );
    this.$router.push(`/dashboard?pageno=${1}`)
    this.$toast.add({
      severity: 'success',
      summary: 'Upload Complete',
      detail: 'File uploaded successfully.',
      life: 3000
    });
    this.$router.push(`/dashboard?pageno=1`)

  } catch (error) {
    console.error(error);
    this.$toast.add({
      severity: 'error',
      summary: 'Upload Failed',
      detail: 'Error uploading file.',
      life: 3000
    });
  }
  finally{
     this.isLoading=false;
  }

  // Reset
  this.progress = 0;
  this.tags = [];
  this.visible = false;
  event.options.clear();
        
      },
      async refreshFiles(){
        try {
          // console.log(this.search)
          //  this.$store.commit("setSearch",this.search);
          //  await this.$store.dispatch("getFilesFromTags") 
         const pageno = this.$route.query.pageno || 1;
        const tagsearch = this.$route.query.tagsearch || '';
        this.$store.commit("setSearch",this.search)
        if(this.search){
          this.$router.push(`/dashboard?pageno=${1}&&tagsearch=${this.search}`)
        }
        else{
           this.$router.push(`/dashboard?pageno=${1}`)
        }
       

        } catch (error) {
            console.log(error)
        }
      },
     
    }
  };
  </script>
  
  <style scoped>
  /* Optional custom styling */
  </style>
  