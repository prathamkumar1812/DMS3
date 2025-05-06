<template>
  <div class="flex flex-col gap-3">
    
    <div class="flex flex-row gap-4 items-center justify-between">
      <div class="flex flex-row  gap-4 items-center ">
        <div>
        <!-- Use emojis for demo; replace with real icon classes or image paths as needed -->
        <span v-if="fileIcon === 'image'">🖼️</span>
        <span v-else-if="fileIcon === 'pdf'">📄</span>
        <span v-else-if="fileIcon === 'code'">💻</span>
        <span v-else>📁</span>
      </div>
      <div @click="handlePreview" class="cursor-pointer text-blue-600 ">
        {{ fileName }}
      </div>
      <div class="flex flex-wrap gap-2 ">
      <Chip v-for="tag in tags" :key="tag" :label="tag" />
      </div>
      </div>
      <Button @click="confirm2()" icon="pi pi-times" class="text-white"  rounded variant="outlined" aria-label="Cancel" size="small" />
      
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  props: {
    fileName: {
      type: String,
      required: true,
    },
    fileId: {
      type: String,
      required: true,
    },
    tags:{
      type:[String],
      required:true
    }
  },
  methods: {
    handlePreview() {
      this.$router.push(`/preview/${this.fileId}`);
    },
   async confirm2() {
            this.$confirm.require({
                message: 'Do you want to delete this File?',
                header: 'Danger Zone',
                icon: 'pi pi-info-circle',
                rejectProps: {
                    label: 'Cancel',
                    severity: 'secondary',
                    outlined: true
                },
                acceptProps: {
                    label: 'Delete',
                    severity: 'danger'
                },
                accept: async () => {
                    await this.$store.dispatch("deleteFileById",this.fileId);
                    this.$toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
                },
                reject: () => {
                }
            });
        }
  },
  computed: {
    fileIcon() {
      const ext = this.fileName.split('.').pop().toLowerCase();

      if (["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(ext)) {
        return 'image';
      } else if (ext === "pdf") {
        return 'pdf';
      } else if (["js", "ts", "html", "css", "vue", "java", "py", "cpp", "cs"].includes(ext)) {
        return 'code';
      } else {
        return 'file';
      }
    }
  }
};
</script>

<style>
/* You can style the icons or use Tailwind/FontAwesome/etc. */

</style>
