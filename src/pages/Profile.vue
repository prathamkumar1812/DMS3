<template>
  <div class="w-full h-screen flex flex-row">
    <div class="w-full flex flex-col border-r-2 items-center gap-5 p-4">
      <div class=" card flex flex-col">
        <div class=" h-[200px] rounded-full w-[200px] border-2 mt-[60px] bg-violet-200 flex items-center justify-center text-[100px]">
             {{firstInitial }}
        </div>
        <div class="mt-[80px] w-full flex flex-col gap-5">
           <div>
          <span class=" text-2xl">Full Name :</span> <span class=" text-shadow-md">{{ fullName }}</span>
        </div>
         <div>
          <span class="text-2xl">Email :</span> <span>{{ email }}</span>
        </div>
        </div>
       

      </div>
    </div>
    <div class="w-full flex flex-col">
      <div class="w-full text-center mb-3 mt-3">
        <h2 class="text-3xl">
          Total Files Used
        </h2>
      </div>
       <div class="card flex justify-center">
        <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full md:w-[20rem]" />
    </div>
    </div>
  </div>
</template>

<script>
export default {
   data() {
        return {
            chartData: null,
            chartOptions: {
                cutout: '60%'
            }
        };
    },
    mounted() {
        this.chartData = this.setChartData();
        this.chartOptions = this.setChartOptions();
    },
    methods: {
        setChartData() {
            const documentStyle = getComputedStyle(document.body);

            return {
                labels: ['Remaining', 'Used'],
                datasets: [
                    {
                        data: [20-this.totalItemsCount, this.totalItemsCount],
                        backgroundColor: [documentStyle.getPropertyValue('--p-gray-500'), documentStyle.getPropertyValue('--p-orange-500') ],
                        hoverBackgroundColor: [documentStyle.getPropertyValue('--p-gray-400'), documentStyle.getPropertyValue('--p-orange-400')]
                    }
                ]
            };
        },
        setChartOptions() {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--p-text-color');

            return {
                plugins: {
                    legend: {
                        labels: {
                            cutout: '60%',
                            color: textColor
                        }
                    }
                }
            };
        }
    },
    computed:{
       totalItemsCount(){
        return this.$store.state.User.files;
      },
      email(){
        return this.$store.state.User.email
      },
      fullName(){
        return this.$store.state.User.name
      },
       firstInitial() {
      return this.fullName?.charAt(0).toUpperCase() || '';
    },
    }

}
</script>

<style>

</style>