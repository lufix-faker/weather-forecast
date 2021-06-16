<template>
  <div class="weather-future" @click="openDetail">
    <div
      class="future-row"
      v-for="(item, index) in futureWeather.slice(1, 4)"
      :key="index"
    >
      <span>{{ item.time }}</span>
      <span>{{ dayList[index] }}</span>
      <span>{{ item.day_weather_short }}</span>
      <span>{{ item.day_wind_direction }}</span>
      <span>{{ item.min_degree }}~{{ item.max_degree }}℃</span>
    </div>
  </div>
</template>

<script>
import { getFuture } from "network/home";

export default {
  name: "SwiperWeatherFuture",
  props: {
    currentCity: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      futureWeather: [],
      dayList: ['今天','明天','后天']
    };
  },
  created() {
    this.getFuture();
  },
  methods: {
    /* 网络请求 */
    // 获取未来几天的天气状况
    getFuture() {
      getFuture(this.currentCity.province, this.currentCity.city).then(
        (res) => {
          let arr = [];
          let obj = res.data.forecast_24h;
          for(let i in obj) {
            arr.push(obj[i]);
          }
          
          this.futureWeather = arr;
        }
      )
    },
    // 点击打开详情页
    openDetail() {
      this.$router.push('/detail');
      this.$store.commit('setFutureWeather', this.futureWeather);
    }
  },
};
</script>

<style scoped>
.weather-future {
  height: 102px;
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