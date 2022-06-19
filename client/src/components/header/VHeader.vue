<template lang="html">
  <header class="p-[1em] mb-[1.5em] box-shadow-1 flex justify-between items-center">
    <p>Logo</p>

    <div class="flex items-center">
      <p class="mr-[1.5em] hover:text-main cursor-pointer">
        <i class="el-icon-notebook-1" />
        <span>Tin tức</span>
      </p>
      <p class="mr-[1.5em] hover:text-main cursor-pointer">
        <i class="el-icon-s-goods" />
        <span>Giỏ hàng</span>
      </p>
      <p class="mr-[1em] hover:text-main cursor-pointer">
        <i class="el-icon-s-custom" />
        <span>Đăng nhập</span>
      </p>
    </div>
  </header>
</template>
<script>
export default {
  name: 'VHeader'
}
</script>
<style lang="scss"></style>
