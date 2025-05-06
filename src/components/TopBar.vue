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
  
        <Dialog v-model:visible="visible" modal header="Upload File" :style="{ width: '25rem' }">
          <span class="text-surface-500 dark:text-surface-400 block mb-4">
            Select a file to upload and add tags.
          </span>
  
          <!-- Tags Input -->
          <div class="mb-4">
            <label for="tags" class="block text-sm mb-1">Tags:</label>
            <Chips class="w-full" v-model="tags" separator="," placeholder="Enter tags and press enter or comma" />
          </div>
  
          <!-- File Upload -->
          <FileUpload
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
        search:""
      };
    },
    methods: {
      async onCustomUpload(event) {
        const file = event.files[0];
        if (!file) return;
  
        const formData = new FormData();
        formData.append('file', file);
           console.log(this.tags.value)
        this.tags.forEach(tag => {
  formData.append('Tags', tag);
});


        
  
        const response = await this.$store.dispatch('Upload', formData);
        this.$toast.add({ severity: 'info', summary: 'Success', detail: "Upload successfully", life: 3000 });
  
        // Reset after upload
        this.tags = [];
        this.visible = false;
      },
      async refreshFiles(){
        try {
           await this.$store.dispatch("getFilesFromTags",this.search) 
        } catch (error) {
            console.log(error)
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Optional custom styling */
  </style>
  