<template lang="html">
  <div
    class="card-item cursor-pointer rounded-[4px]"
    @click="$router.push({ name: 'InforDetail', params: { id: initData.id } })"
  >
    <img class="w-full h-[200px]" :src="initData.imageDetails[0]" />
    <div class="card-content">
      <p class="font-[700] text-lg pc:text-[1.25rem]">{{ initData.name }}</p>
      <p class="">Địa chỉ: {{ initData.address }}</p>
      <div class="flex justify-between">
        <p class="max-w-[70%]">Số người: {{ initData.limitUsers }}</p>
        <div class="start">
          <span class="text-[#fadb14]"><i class="el-icon-star-on" /></span>
        </div>
      </div>
      <p>
        Giá chỉ từ: <span class="text-[#3a6026] font-[700]">{{ initData.priceMin }}đ</span> / Trận
      </p>
      <p class="flex justify-between">
        <span><i class="el-icon-check" />Wifi</span>
        <span><i class="el-icon-check" />Căng tin</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    initData: {
      type: Object,
      require: true,
      default: () => ({})
    }
  }
}
</script>
<style lang="scss" scoped>
.card-item {
  border: 1px solid #ededed;
}

.card-item:hover {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.card-content {
  padding: 0.5em;
  line-height: 1.8rem;
}
</style>
