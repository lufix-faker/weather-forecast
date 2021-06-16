<template>
  <div class="manage-item">
    <div class="up">
      <span class="city-name">{{ currentCity.city }}</span>
      <span class="temp">{{ observe.degree }}℃</span>
    </div>
    <div class="down">
      <span>{{ weather_short }}</span>
      <span class="division">|</span>
      <span>湿度{{ observe.humidity }}%</span>
      <span class="degree_range">{{ min_degree }}~{{ max_degree }}℃</span>
    </div>
  </div>
</template>

<script>
import { getFuture } from "network/home";

export default {
  name: "ManageItem",
  props: {
    currentCity: {
      type: Object,
      default() {
        return {}
      }
    },
    observe: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  data() {
    return {
      temp: 0,
      weather_short: "",
      min_degree: 0,
      max_degree: 100,
    };
  },
  created() {
    // 根据cityList发送网络请求 获取当天的未来天气
    this.getFuture();
  },
  methods: {
    /* 发送网络请求 */
    // 获取todayFuture
    getFuture() {
      getFuture(this.currentCity.province, this.currentCity.city).then(
        (res) => {
          let result = res.data.forecast_24h[1];
          this.weather_short = result.day_weather_short;
          this.min_degree = result.min_degree;
          this.max_degree = result.max_degree;
        }
      );
    },
  },
};
</script>

<style scoped>
.manage-item {
  height: 85px;
  margin: 5px;
  margin-top: 10px;
  padding: 10px;

  border-radius: 10px;
  box-shadow: 0 0 3px #ccc;
  background-color: #fff;
}

.up {
  height: 45px;
  border-bottom: 2px solid #000;
}

.up .city-name{
  font-size: 24px;
  line-height: 42px;
  padding-left: 10px;
}

.up .temp {
  float: right;
  padding-right: 10px;

  font-size: 30px;
}

.down {
  padding-top: 5px;

  font-size: 12px;
  color: #666;
}

.down .division {
  padding: 0 3px;
  font-size: 14px;
}

.down .degree_range {
  float: right;
  padding-right: 10px;
}
</style>