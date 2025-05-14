<template>
  <div  class=" h-full w-full">
    <div v-if="isLoading" class=" h-full card flex justify-center items-center">
        <ProgressSpinner />
    </div>
    <div v-else class=" h-full flex flex-col ">
      <div v-if="fileUrl" class=" flex flex-row gap-4  items-center pl-4  mb-3 ml-2.5">
     <h2 class="text-2xl">
  {{ fileName.length > 40 ? fileName.slice(0, 40) + '...' : fileName }}
</h2>

      <button @click="downloadFile" class="download-btn">Download File</button>
    </div>
    <div class="h-full ">
      <iframe 
      v-if="isPDF" 
      :src="fileUrl + '#toolbar=0&navpanes=0&scrollbar=0'" 
      class="preview-frame" 
      frameborder="0" 
    />

    <!-- Show Image -->
     <div  v-else-if="isImage"  >
      <img :src="fileUrl" alt="Preview" width="700px" class="preview-image" />
     </div>
   

 
    <pre v-else-if="isCodeFile" class="code-preview ml-3 mr-3">
      <code class="language" v-html="codeContent"></code>
    </pre>


    <div v-else>
       <h2 class=" text-center text-3xl">Not able to show Preview
</h2>
    </div>

    </div>
    </div>
    
   
 
   
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import VueFilesPreview from 'vue-files-preview';
import { preview } from '../lib/service'; // Your API service to get the file data
import Prism from 'prismjs'; // Import Prism.js for syntax highlighting
import 'prismjs/themes/prism.css'; // Include Prism CSS
import { useStore } from 'vuex';
const route = useRoute();
   const store = useStore();
const fileId = route.params.id as string;

const fileUrl = ref<string>('');
const publicLink = ref<string | null>(null);
const mimeType = ref('');
const codeContent = ref<string>(''); // Holds the code content

// Update to check if the file is any text-based file, like .txt, .json, etc.
const isLoading= ref(true);
const isPDF = computed(() => mimeType.value === 'application/pdf');
const isImage = computed(() => mimeType.value.startsWith('image/'));
const isCodeFile = computed(() => mimeType.value.startsWith('text/') || mimeType.value === 'application/json' || mimeType.value === 'text/plain');
const fileName = computed(() => store.getters.getFileNameById(fileId));
onMounted(async () => {
  try {
    // Request the file data (ensure the responseType is 'blob' for binary data)
    const response = await preview(fileId, { responseType: 'blob' });
    isLoading.value=false;
    const contentType = response.headers['content-type'];
    console.log('Content-Type:', contentType);

    const blob = new Blob([response.data], { type: contentType });
    mimeType.value = blob.type;

    // Create a valid object URL for the blob
    const url = URL.createObjectURL(blob);

    // Make sure we are passing a URL or file object, not a Blob directly
    fileUrl.value = url;
    console.log('File URL:', fileUrl.value); // Debugging URL

    // Check if it's a code file, and process it as text
    if (isCodeFile.value) {
      // Use FileReader to read Blob as text (for code files)
      const reader = new FileReader();
      reader.onload = () => {
        // Store the code content and apply syntax highlighting
        codeContent.value = reader.result as string; 
        Prism.highlightAll(); // Apply syntax highlighting
      };
      reader.onerror = (err) => {
        console.error('Error reading file as text:', err);
      };

      reader.readAsText(blob); // Read the file content as text
    }

  } catch (err) {
    console.error('Preview failed:', err);
  }
});

onUnmounted(() => {
  if (fileUrl.value) {
    URL.revokeObjectURL(fileUrl.value); // Cleanup the URL after component is destroyed
  }
});

function downloadFile() {
  if (!fileUrl.value) return;

  const a = document.createElement('a');
  a.href = fileUrl.value;
  a.download = `file-${fileId}`; // You can adjust the filename here
  a.click();
}

function generatePublicLink() {
  publicLink.value = `${window.location.origin}/File/preview/${fileId}`;
}
</script>

<style scoped>
.file-preview-container {
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #f9f9f9;
}

.preview-frame {
  width: 100%;
  height: 100%;
  
  border: none;
  border-radius: 6px;
  background: white;
}

.preview-image {
  max-width: 70%;
  
  display: block;
  margin: auto;
  border-radius: 6px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

.code-preview {
  background-color: #2d2d2d;
  color: #f8f8f2;
 
  border-radius: 8px;
  overflow-x: auto;
  white-space: pre-wrap;
  max-height: 80%;
  line-height: 1.6;
}

.language {
  font-family: 'Courier New', Courier, monospace;
}

.download-btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
}

.download-btn:hover {
  background-color: #45a049;
}
</style>
