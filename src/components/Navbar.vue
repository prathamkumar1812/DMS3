<template>
  <div class="h-screen flex flex-col gap-4 justify-between  w-[70px] hover:w-1/6 transition-all duration-300 ease-in-out group">
    
    <!-- Top Avatar Section -->
    <div>
      <div class="w-full  inline-flex size-16 items-center justify-center">
       
        <span class=" grid size-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
          <img src="../../public/ChatGPT Image May 9, 2025, 10_50_56 AM.png" alt="Logo">  
        </span>
        <span  class=" ml-2 text-4xl  overflow-hidden whitespace-nowrap  text-gray-700 opacity-0 max-w-0 group-hover:max-w-[200px] group-hover:opacity-100 transition-all duration-300 ease-in-out">
         DMS
      </span>
      </div>
      

      <div class="border-t border-gray-100 px-2">
        <div class=" mt-4 h-[60px] flex items-center justify-center gap-2 transition-all duration-300 ease-in-out">
          <span class="grid  place-content-center rounded-lg bg-gray-100 text-xs text-gray-600 shrink-0">
            <Avatar :label="Avater" size="large" style="background-color: #ece9fc; color: #2a1261" />
          </span>
          
          <!-- Smooth email reveal -->
          <span class="overflow-hidden whitespace-nowrap text-sm text-gray-700 opacity-0 max-w-0 group-hover:max-w-[200px] group-hover:opacity-100 transition-all duration-300 ease-in-out">
            {{ $store.state.User.name }}
          </span>
        </div>
        <div class=" overflow-hidden whitespace-nowrap text-center mt-2.5  text-lg text-gray-700 opacity-0 max-w-0 group-hover:max-w-[200px] group-hover:opacity-100 transition-all duration-300 ease-in-out">
         Total Files -{{ totalItemsCount }}
       </div>
        <div class="px-2">
          <ul class="space-y-3 border-t mt-[40px] border-gray-100 pt-2 ">
            <li class="">
              <router-link to="/dashboard?pageno=1"
                class="group relative flex justify-start rounded-sm px-2 py-1.5">
                <div class="flex flex-row gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="3" y="3" width="7" height="9"></rect>
  <rect x="14" y="3" width="7" height="5"></rect>
  <rect x="14" y="12" width="7" height="9"></rect>
  <rect x="3" y="16" width="7" height="5"></rect>
</svg>

                <span class="overflow-hidden whitespace-nowrap text-sm text-gray-700 opacity-0 max-w-0 group-hover:max-w-[200px] group-hover:opacity-100 transition-all duration-300 ease-in-out">
                  Dashboard
                </span>
                </div>
              </router-link>
            </li>
            <li class="">
              <router-link to="/profile"
                class="group relative flex justify-start rounded-sm px-2 py-1.5">
                <div class="flex flex-row gap-1.5">

                
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
  <circle cx="12" cy="7" r="4"></circle>
</svg>

                <span class="overflow-hidden whitespace-nowrap text-sm text-gray-700 opacity-0 max-w-0 group-hover:max-w-[200px] group-hover:opacity-100 transition-all duration-300 ease-in-out">
                 Profile
                </span>
              </div>
              </router-link>
            </li>
            <li>
              <router-link to="/create-task"
                class="group relative flex justify-start rounded-sm px-2 py-1.5">
                <div class="flex flex-row gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.07 2h3a2 2 0 0 1 2 1.72c.12.81.32 1.6.59 2.36a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.72-1.72a2 2 0 0 1 2.11-.45c.76.27 1.55.47 2.36.59a2 2 0 0 1 1.72 2z"></path>
</svg>

                <span class="overflow-hidden whitespace-nowrap text-sm text-gray-700 opacity-0 max-w-0 group-hover:max-w-[200px] group-hover:opacity-100 transition-all duration-300 ease-in-out">
                  Contact
                </span>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Logout Button -->
    
    <div v-if="isLoading" class="group mb-4 cursor-pointer relative flex gap-1.5 justify-center rounded-sm px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700">
       <ProgressSpinner style="width: 20px; height: 20px" strokeWidth="8" fill="transparent"
    animationDuration=".5s" aria-label="Custom ProgressSpinner" />
    </div>
    <div v-else  @click="handleLogout" class="group mb-4 cursor-pointer relative flex gap-1.5 justify-center rounded-sm px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
      </svg>
      <span  class=" overflow-hidden whitespace-nowrap text-sm text-gray-700 opacity-0 max-w-0 group-hover:max-w-[200px] group-hover:opacity-100 transition-all duration-300 ease-in-out">
        Logout
      </span>
    </div>

  </div>
</template>



<script>
export default {
    data(){
      return{
        isLoading:false
      }
    },
    computed:{
      Avater(){
        const name = this.$store.state.User.name;
  return name ? name.charAt(0).toUpperCase() : '';
      },
      totalItemsCount(){
        return this.$store.state.User.files;
      }

    },
    methods:{
      async handleLogout(){
        try {
          this.isLoading=true;
           await this.$store.dispatch('logoutUser')
             this.$route.push('/login')
        } catch (error) {
            console.log(error)
        }
        finally{
          this.isLoading=false
        }
      }
    }
}
</script>

<style>

</style>