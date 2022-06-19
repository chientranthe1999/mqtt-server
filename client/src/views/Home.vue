<template lang="html">
  <div>
    <div class="my-[1em]">
      <section class="mb-[1em]">
        <p class="px-[0.5em] py-[1em] mb-[1em] rounded-md box-shadow pc:text-lg text-md font-[600]">
          Thông số ngày: <i>{{ currentData.date }}</i>
        </p>
        <el-row :gutter="24">
          <el-col class="text-center mb-[1em]" :xs="12" :sm="12" :md="6" :lg="6">
            <div class="infor-item">
              <img src="@/icons/temperature.svg" alt="" class="w-[40px] mx-auto" />
              <p>Temperature</p>
              <p class="font-[600]">{{ currentData.air_temperature }}°C</p>
            </div>
          </el-col>
          <el-col class="text-center mb-[1em]" :xs="12" :sm="12" :md="6" :lg="6">
            <div class="infor-item">
              <img src="@/icons/humidity.svg" alt="" class="w-[40px] mx-auto" />
              <p>Độ ẩm không khí</p>
              <p class="font-[600]">{{ currentData.air_humidity }}%</p>
            </div>
          </el-col>
          <el-col class="text-center mb-[1em]" :xs="12" :sm="12" :md="6" :lg="6">
            <div class="infor-item">
              <img src="@/icons/soil-humidity.svg" alt="" class="w-[40px] mx-auto" />
              <p>Độ ẩm đất</p>
              <p class="font-[600]">{{ currentData.soil_humidity }}%</p>
            </div>
          </el-col>
          <el-col class="text-center mb-[1em]" :xs="12" :sm="12" :md="6" :lg="6">
            <div class="infor-item">
              <img src="@/icons/light.svg" alt="" class="w-[40px] mx-auto" />
              <p>Ánh sáng</p>
              <p class="font-[600]">{{ currentData.light }}Lux</p>
            </div>
          </el-col>
        </el-row>
      </section>

      <section>
        <p class="px-[0.5em] py-[1em] mb-[1em] rounded-md box-shadow text-lg font-[600]">Thông tin chi tiết</p>
        <el-row :gutter="24">
          <el-col class="text-center mb-[1em]" :xs="24" :md="12" :lg="12">
            <div class="rounded-md box-shadow">
              <p>Biểu đồ thay đổi nhiệt độ theo gian</p>
              <apexchart type="line" :options="chartOptions" :series="temperatureSeries"></apexchart>
            </div>
          </el-col>
          <el-col class="text-center mb-[1em]" :xs="24" :md="12" :lg="12">
            <div class="rounded-md box-shadow">
              <p>Biểu đồ thay độ ẩm theo thời gian</p>
              <apexchart type="line" :options="chartOptions" :series="humiditySeries"></apexchart>
            </div>
          </el-col>
          <el-col class="text-center mb-[1em]" :xs="24" :md="12" :lg="12">
            <div class="rounded-md box-shadow">
              <p>Biểu đồ thay độ ẩm đất theo thời gian</p>
              <apexchart type="line" :options="chartOptions" :series="soilHumiditySeries"></apexchart>
            </div>
          </el-col>
          <el-col class="text-center mb-[1em]" :xs="24" :md="12" :lg="12">
            <div class="rounded-md box-shadow">
              <p>Biểu đồ thay ánh sáng theo thời gian</p>
              <apexchart type="line" :options="chartOptions" :series="lightSeries"></apexchart>
            </div>
          </el-col>
        </el-row>
      </section>
    </div>
  </div>
</template>
<script>
import { getGarden } from '@/api/garden'
import moment from 'moment'
export default {
  name: 'HomeView',

  async created() {
    try {
      const { data } = await getGarden()

      this._getCurrentData(data)
      this._createChartData(data)
    } catch (error) {
      console.log(error)
    }
  },

  data() {
    return {
      currentData: {},
      inforData: [],
      temperatureSeries: [],
      humiditySeries: [],
      soilHumiditySeries: [],
      lightSeries: [],

      chartOptions: {
        chart: {
          height: 400,
          type: 'line',
          zoom: {
            enabled: false
          }
        },

        dataLabels: {
          enabled: false
        },

        xaxis: {}
      }
    }
  },

  methods: {
    _formatNumber(textNumber) {
      return Number(textNumber).toFixed(1)
    },

    _getCurrentData(data) {
      if (data.length) {
        const lastData = data[data.length - 1]
        this.currentData = {
          air_temperature: this._formatNumber(lastData.air_temperature),
          soil_humidity: this._formatNumber(lastData.soil_humidity),
          light: this._formatNumber(lastData.light),
          air_humidity: this._formatNumber(lastData.air_humidity),
          date: moment(lastData.date).format('HH:mm DD/MM/YYYY')
        }
      }
    },

    _createChartData(infor) {
      const temperature = []
      const humidity = []
      const soilHumidity = []
      const light = []
      const xaxis = []

      infor.forEach((item) => {
        temperature.push(item.air_temperature)
        humidity.push(item.air_humidity)
        soilHumidity.push(item.soil_humidity)
        light.push(item.light)
        xaxis.push(moment(item.date).format('HH:mm'))
      })

      this.temperatureSeries = [{ name: 'Nhiệt độ', data: temperature }]
      this.humiditySeries = [{ name: 'Độ ẩm không khí', data: humidity }]
      this.soilHumiditySeries = [{ name: 'Độ ẩm đất', data: soilHumidity }]
      this.lightSeries = [{ name: 'Ánh sáng', data: light }]
      this.chartOptions = { ...this.chartOptions, xaxis: { categories: xaxis } }
    }
  }
}
</script>
<style lang="scss" scoped>
.infor-item {
  @apply px-[1em] py-[1.25em] rounded-lg;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}
.box-shadow {
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}
.box-shadow-2 {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}
</style>
