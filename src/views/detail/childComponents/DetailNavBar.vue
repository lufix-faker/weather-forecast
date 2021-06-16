<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in title"
          :key="item"
          class="title-item"
          @click="itemClick(index)"
          :class="{active: currentIndex === index}"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      title: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    }
  },
  methods: {
    // 返回按钮点击
    backClick() {
      this.$router.back();
    },
    // 标题按钮点击
    itemClick(index) {
      // this.currentIndex = index;

      this.$emit('titleClick', index)
    }
  },
};
</script>

<style scoped>
  .back img {
    margin-top: 10px;
    margin-left: 15px;
  }

  .title {
    display: flex;
    font-size: 14px;
  }
  
  .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }
</style>