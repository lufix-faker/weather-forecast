<template>
  <div class="add-city">
    <!-- 顶部栏 -->
    <top-bar>
      <template #left>
        <div class="back" @click="backClick">
          <img src="~assets/img/icon/icon_back.png" alt="" />
        </div>
      </template>
      <template #center>添加城市</template>
    </top-bar>

    <!-- 联动省市 -->
    <div class="search">
      <select
        v-model="selectP"
        class="select-province"
        @change="selectProvince"
      >
        <option v-for="(p, i) in allProvince" :key="i" :value="p.province">
          {{ p.province }}
        </option>
      </select>
      <select v-model="selectC" class="select-city">
        <option v-for="(c, k) in allCity" :key="k" :value="c.cityName">
          {{ c.cityName }}
        </option>
      </select>
      <!-- 按钮 -->
      <button class="addBtn" @click="addCityToList(selectP, selectC)">
        添加
      </button>
    </div>

    <!-- 热门城市 -->
    <div class="hot-city">
      <p>热门城市</p>
      <span
        class="hot-city-item"
        v-for="(item, index) in hotCity"
        :key="index"
        @click="addCityToList(item.province, item.city)"
      >
        {{ item.city }}
      </span>
    </div>
  </div>
</template>

<script>
import TopBar from "components/content/topBar/TopBar";

import {
  getProvince,
  getCity,
  getProvinceJSON,
  getCityJSON,
} from "network/search";

export default {
  name: "AddCity",
  components: {
    TopBar,
  },
  data() {
    return {
      allProvince: {},
      allCity: [],
      selectP: "",
      selectC: "",
      get_province: {},
      cityList: [],
      addCity: {},
      specialCity: ["北京", "上海", "天津", "重庆"],
      hotCity: [
        { province: "北京", city: "北京" },
        { province: "广东", city: "广州" },
        { province: "湖南", city: "长沙" },
        { province: "浙江", city: "杭州" },
        { province: "上海", city: "上海" },
        { province: "湖北", city: "武汉" },
      ],
    };
  },
  created() {
    // 获取省份列表
    this.getProvince();

    // 从vuex获取cityList
    this.cityList = this.$store.state.cityList;
  },
  methods: {
    // 返回manage管理页面
    backClick() {
      this.$router.push("/manage");
    },
    /* 发送网络请求 */
    // 获取所有省份
    getProvince() {
      this.allProvince = getProvinceJSON();

      getProvince().then(res => {
        this.get_province = res;
      });
    },
    // 选择省份
    selectProvince() {
      this.allCity = getCityJSON(this.selectP);
      this.selectC = this.allCity[0].cityName;
    },
    // 添加城市到列表
    async addCityToList(province, city) {
      // 判断是否列表已有该城市
      for (var j of this.cityList) {
        if (j.city === city) {
          this.$toast.show("该城市已在列表中");
          return;
        }
      }


      let provinceCode = null;
      for(var i in this.get_province) {
        if(province == this.get_province[i]) {
          provinceCode=i;
        }
      }

      let get_cities = await getCity(provinceCode);
      let flag = 0;
      for(var k in get_cities) {
        if(get_cities[k] == city) {
          flag++
        }
      }

      if(flag == 0) {
        this.$toast.show('暂未收录此城市');
        return;
      }

      this.addCity.province = province;
      this.addCity.city = city;

      // 添加到vuex的cityList
      this.$store.commit("addCityList", this.addCity);

      this.$toast.show("添加成功");

      // 添加完成跳转回manage管理页面
      this.$router.push("/manage");
      return;
    },
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

.search {
  display: flex;
}

.select-province,
.select-city {
  width: 30%;
  height: 30px;
  margin: 20px 5px;
}

.addBtn {
  width: 20%;
  height: 30px;
  margin: 20px;
}

.hot-city p {
  padding: 5px;
}

.hot-city-item {
  display: inline-block;
  width: 16%;
  margin: 5px;
  padding: 5px;

  background-color: #e6f8c4;
  text-align: center;
}
</style>