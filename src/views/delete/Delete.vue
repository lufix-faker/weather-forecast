<template>
  <div class="delete">
    <top-bar>
      <template #left>
        <div class="cancel" @click="cancelClick">
          <img src="~assets/img/icon/icon_error.png" alt="" />
        </div>
      </template>
      <template #center>城市管理</template>
      <template #right>
        <div class="confirm" @click="confirmClick">
          <img src="~assets/img/icon/icon_right.png" alt="" />
        </div>
      </template>
    </top-bar>
    <delete-item
      v-for="(item, index) in changedCityList"
      :key="index"
      :currentCity="item"
      :observe="observe[index]"
      @deleteItemClick="deleteItemClick(index)"
    ></delete-item>

    <div class="mask" v-show="isShow"></div>
    <prompt v-show="isShow" @noClick="noClick" @yesClick="yesClick"></prompt>
  </div>
</template>

<script>
import TopBar from "components/content/topBar/TopBar";
import Prompt from "components/content/prompt/Prompt";

import DeleteItem from "./components/DeleteItem";

export default {
  name: "Delete",
  components: {
    TopBar,
    DeleteItem,
    Prompt,
  },
  data() {
    return {
      cityList: [],
      observe: [],
      changedCityList: [],
      isShow: false,
    };
  },
  created() {
    // 从vuex获取cityList
    this.getCityList();

    // 用changedCityList存储还没确认的数组
    this.changedCityList = JSON.parse(JSON.stringify(this.cityList));
  },
  methods: {
    // 从vuex获取cityList
    getCityList() {
      this.cityList = this.$store.state.cityList;
    },
    // 删除某个城市
    deleteItemClick(index) {
      this.changedCityList.splice(index, 1);
    },
    // 点击返回manage页面
    cancelClick() {
      this.isShow = !this.isShow;
      // this.$router.go(-1);
    },
    // 点击确认修改的内容
    confirmClick() {
      // 修改vuex里的cityList的值
      this.$store.commit("setCityList", this.changedCityList);
      // 返回manage管理页面
      this.$router.go(-1);
    },
    // 点击取消 继续修改
    noClick() {
      this.isShow = !this.isShow;
    },
    // 点击确认 放弃修改 返回addCity页面
    yesClick() {
      this.$router.push("/manage");
    },
  },
};
</script>

<style scoped>
.cancel img {
  width: 28px;
  height: 28px;
  margin-top: 8px;
  margin-left: 8px;
}

.confirm img {
  width: 28px;
  height: 26px;
  margin-top: 10px;
  margin-left: 22px;
}

.mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  opacity: 0.6;
  background-color: #ccc;
  z-index: 3;
}
</style>