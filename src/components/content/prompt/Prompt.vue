<template>
  <div class="prompt-box">
    <div class="title">
      <slot name="title">提示信息</slot>
    </div>
    <div class="info">
      <slot name="info">您确定要放弃更改吗？</slot>
    </div>
    <div class="footer">
      <span class="cancel" @click="noClick">
        <slot name="cancel">取消</slot>
      </span>
      <span class="confirm" @click="yesClick">
        <slot name="confirm">放弃更改</slot>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Prompt",
  methods: {
    // 点击取消
    noClick() {
      this.$emit("noClick");
    },
    // 点击放弃
    yesClick() {
      this.$emit("yesClick");
    },
  },
};
</script>

<style scoped>
.prompt-box {
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

.footer {
  margin-top: 28px;
}

.cancel {
  display: inline-block;
  /* margin-top: 20px; */
  margin-left: 140px;

  font-size: 14px;
  color: red;
  vertical-align: top;
}

.confirm {
  display: inline-block;
  /* margin-top: 20px; */
  margin-left: 15px;

  font-size: 14px;
  color: red;
  vertical-align: top;
}
</style>