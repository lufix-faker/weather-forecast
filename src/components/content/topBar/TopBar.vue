<template>
  <div class="top-bar" :style="{background: bgColor}">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopBar",
  data(){
    return {
      bgColor: "#cfcfcf"
    }
  },
  created() {
    this.bgColor = JSON.parse(JSON.stringify(this.$store.state.topBarColor));
  },
  methods: {
    changeColor(color) {
      this.bgColor = color;
      this.$store.commit('setTopBarColor', color);
    }
  }
};
</script>

<style scoped>
  .top-bar {
    display: flex;
    height: 44px;
    line-height: 44px;
  }

  .left {
    width: 60px;
  }

  .center {
    flex: 1;
    text-align: center;
  }

  .right {
    width: 60px;
  }
</style>