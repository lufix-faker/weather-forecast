<template>
  <div class="toast" v-show="isShow">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    message: {
      type: String,
      default: "",
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    show(message, duration = 1500) {
      this.message = message;
      this.isShow = true;

      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
    },
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);

  padding: 6px 10px;
  border-radius: 5px;

  background-color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  color: #fff;
}
</style>