<template>
  <div class="manage">
    <top-bar>
      <template #left>
        <div class="back" @click="backClick">
          <img src="~assets/img/icon/icon_back.png" alt="" />
        </div>
      </template>
      <template #center>城市管理</template>
      <template #right>
        <div class="editor" @click="editorClick">
          <img src="~assets/img/icon/icon_write.png" alt="" />
        </div>
      </template>
    </top-bar>
    <manage-item
      v-for="(item, index) in cityList"
      :key="index"
      :currentCity="item"
      :observe="observe[index]"
    ></manage-item>
    <div class="add-city" @click="addCityClick">
      <img src="~assets/img/icon/img_add.png" alt="">
    </div>
  </div>
</template>

<script>
import TopBar from "components/content/topBar/TopBar";

import ManageItem from "./components/ManageItem";

export default {
  name: "Manage",
  components: {
    TopBar,
    ManageItem,
  },
  data() {
    return {
      cityList: [],
      observe: [],
    };
  },
  created() {
    // 从vuex获取cityList
    this.getCityList();

    // 从vuex获取observe
    this.getObserve();
  },
  methods: {
    // 从vuex获取cityList
    getCityList() {
      this.cityList = this.$store.state.cityList;
    },
    // 从vuex获取observe
    getObserve() {
      this.observe = this.$store.state.observe;
    },
    // 点击返回首页
    backClick() {
      this.$router.push('/home');
    },
    // 点击跳转编辑页面
    editorClick() {
      this.$router.push('/delete');
    },
    // 点击跳转添加城市页面
    addCityClick() {
      this.$router.push('/add_city');
    }
  },
};
</script>

<style scoped>
.back img {
  width: 28px;
  height: 28px;
  margin-top: 8px;
  margin-left: 8px;
}

.editor img {
  width: 28px;
  height: 26px;
  margin-top: 10px;
  margin-left: 22px;
}

.add-city {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 40px;
  height: 40px;
}

.add-city img {
  width: 100%;
}

</style>