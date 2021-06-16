<template>
  <div class="top">
    <div class="add" @click="manageClick">
      <img src="~assets/img/icon/icon_add.png" alt="" />
    </div>

    <div class="title">{{ cityList[activeIndex].city }}</div>

    <div class="more" @click="moreClick">
      <img src="~assets/img/icon/icon_more.png" alt="" />
    </div>
  </div>
</template>

<script>
import TopBar from "components/content/topBar/TopBar";

export default {
  name: "HomeTopBar",
  components: {
    TopBar,
  },
  data() {
    return {
      cityList: [],
      activeIndex: 0
    };
  },
  created() {
    // 从vuex获取cityList
    this.cityList = this.$store.state.cityList;
  },
  mounted() {
    this.$bus.$on('activeIndex', (index)=> {
      this.activeIndex = index;
    })
  },
  methods: {
    // 点击manage按钮
    manageClick() {
      // 发送事件总线给HomeSwiper 把observe传入vuex
      this.$bus.$emit("manageClick");

      // 跳转管理页面
      this.$router.push("/manage");
    },
    // 点击more按钮
    moreClick() {
      this.$router.push("/more");
    },
  },
};
</script>

<style scoped>
.add img {
  position: absolute;
  left: 8px;
  top: 8px;
  width: 28px;
  height: 28px;
  z-index: 3;
}

.more img {
  z-index: 3;
  position: absolute;
  top: 10px;
  right: 2px;
  width: 30px;
  height: 25px;
}

.title {
  position: fixed;
  left: 50%;
  top: 3px;
  transform: translateX(-50%);

  z-index: 3;
  font-size: 18px;
  letter-spacing: 8px;
  text-indent: 8px;
  text-align: center;
}

</style>