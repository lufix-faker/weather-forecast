<template>
  <div class="message-box">
    <div class="title">
      <slot name="title">xx指数</slot>
    </div>
    <div class="info">
      <slot name="info">内容</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageBox',
}
</script>

<style scoped>
.message-box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 80%;
  height: 22%;
  border: 1px solid #000;
  background-color: #fff;
  z-index: 5;
}

.title {
  font-size: 18px;
  margin: 10px 10px;
}

.info {
  font-size: 14px;
  margin: 10px 10px;
}
</style>