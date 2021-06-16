<template>
  <div class="detail">
    <top-bar>
      <template v-slot:left>
        <div class="add" @click="backHome">
          <img src="~assets/img/icon/icon_back.png" alt="" />
        </div>
      </template>
      <template #center>详情</template>
    </top-bar>
    <div class="future-seven">
      <div
        class="future-row"
        v-for="(item, index) in futureWeather.slice(1, 8)"
        :key="index"
      >
        <span>{{ item.time }}</span>
        <span>{{ item.day_weather_short }}</span>
        <span>{{ item.day_wind_direction }}</span>
        <span>{{ item.min_degree }}~{{ item.max_degree }}℃</span>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "components/content/topBar/TopBar";

export default {
  name: "Detail",
  components: {
    TopBar,
  },
  data() {
    return {
      futureWeather: [],
    };
  },
  created() {
    // 获取储存在vuex的未来几天天气状况
    this.futureWeather = this.$store.state.futureWeather;

  },
  methods: {
    // 返回首页
    backHome() {
      this.$router.push("/home");
    },
  },
};
</script>

<style scoped>
.add img {
  width: 28px;
  height: 28px;
  margin-top: 8px;
  margin-left: 8px;
}

.future-seven {
  margin: 10px 5px;
  padding-bottom: 6px;
  background-color: #c9e0ca;
  border-radius: 10px;
  opacity: 0.65;
}

.future-row {
  display: flex;
  height: 32px;
  line-height: 36px;
  margin: 0 10px;

  text-align: center;
  font-size: 12px;
  border-bottom: 2px solid #fff;
}

.future-row span {
  flex: 1;
}

.future-row span:first-child {
  text-align: left;
  flex: 1.5;
}

.future-row span:last-child {
  text-align: right;
}
</style>