<template>
  <div class="home-swiper">
    <swiper
      class="swiper"
      ref="mySwiper"
      :options="swiperOption"
      v-if="observe.length === cityList.length"
      @slideChangeTransitionEnd="changeTitle"
    >
      <!-- 分页器 -->
      <div class="swiper-pagination" slot="pagination"></div>
      <!-- 内容 -->
      <swiper-slide
        v-for="(item, index) in observe"
        :key="index"
        class="swiper-content"
        :style="chooseBg(index)"
      >
        <div class="degree">{{ item.degree }}℃</div>
        <div class="weather">{{ item.weather }}</div>
        <div class="update_time">{{ dateFormat(item.update_time) }}</div>
        <div class="hum_pre">
          <span class="humidity">湿度{{ item.humidity }}</span>
          <p class="division">|</p>
          <span class="pressure">气压{{ item.pressure }}hPa</span>
        </div>

        <!-- 天气指数 -->
        <swiper-weather-index
          class="weather-index"
          @openIndex="openIndex"
        ></swiper-weather-index>
        <!-- 未来天气 -->
        <swiper-weather-future
          class="weather-future"
          :currentCity="cityList[index]"
        ></swiper-weather-future>
      </swiper-slide>
    </swiper>

    <!-- 天气指数详情 -->
    <div class="mask" v-show="maskShow" @click="maskClick"></div>
    <message-box v-show="maskShow" v-if="weatherIndex.length != 0">
      <div slot="title" >
        {{ weatherIndex[activeIndex][currentWeatherIndex].name }}指数
      </div>
      <div slot="info">
        {{ weatherIndex[activeIndex][currentWeatherIndex].detail }}
      </div>
    </message-box>
  </div>
</template>

<script>
import { getAir, getObserve, getIndex, WeatherIndex } from "network/home";

import SwiperWeatherIndex from "./SwiperWeatherIndex";
import SwiperWeatherFuture from "./SwiperWeatherFuture";

import MessageBox from "components/content/messageBox/MessageBox";

import bg_sunny from "assets/img/bg/bg_sunny.jpeg";
import bg_rainy from "assets/img/bg/bg_rainy.jpeg";
import bg_overcast from "assets/img/bg/bg_overcast.jpeg";
import bg_cloudy from "assets/img/bg/bg_cloudy.jpeg";

const vm = this;

export default {
  name: "HomeSwiper",
  components: {
    SwiperWeatherIndex,
    SwiperWeatherFuture,
    MessageBox,
  },
  data() {
    return {
      activeIndex: 0,
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
        },
        resistanceRatio: 0.6,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
      },
      cityList: [],
      observe: [],
      weatherIndex: [],
      currentWeatherIndex: 0,
      maskShow: false,

      // 图片
      bg_sunny: {
        background: "url(" + bg_sunny + ")",
        backgroundSize: "100% 100%",
      },
      bg_rainy: {
        background: "url(" + bg_rainy + ")",
        backgroundSize: "100% 100%",
      },
      bg_overcast: {
        background: "url(" + bg_overcast + ")",
        backgroundSize: "100% 100%",
      },
      bg_cloudy: {
        background: "url(" + bg_cloudy + ")",
        backgroundSize: "100% 100%",
      },
    };
  },
  created() {
    // 获取cityList
    this.getCityList();

    /* 发送网络请求 */
    // 获取天气状况
    this.getObserve();

    // 获取天气指数
    this.getIndex();
  },
  mounted() {
    this.$bus.$on("manageClick", () => {
      this.$store.commit("setObserve", this.observe);
    });
  },
  computed: {
    // 日期格式化
    dateFormat() {
      return function (s) {
        let year = s.substr(0, 4);
        let month = s.substr(4, 2);
        let day = s.substr(6, 2);
        return year + "-" + month + "-" + day;
      };
    },
  },
  methods: {
    // 获取cityList
    getCityList() {
      this.cityList = this.$store.state.cityList;
    },

    /* 网络请求 */
    // 获取天气状况
    async getObserve() {
      for (let i = 0; i < this.cityList.length; i++) {
        let result = await getObserve(
          this.cityList[i].province,
          this.cityList[i].city
        );
        this.observe.push(result.data.observe);
        // console.log(this.observe[i]);
      }
    },

    // 获取天气指数
    async getIndex() {
      for (let i = 0; i < this.cityList.length; i++) {
        let result = await getIndex(
          this.cityList[i].province,
          this.cityList[i].city
        );
        let wIndex = new WeatherIndex(result.data.index);
        let arr = [];
        for (var j in wIndex) {
          arr.push(wIndex[j]);
        }
        this.weatherIndex.push(arr);
      }
    },

    // 动态改变背景
    chooseBg(index) {
      let currentWeather = this.observe[index].weather;
      if (currentWeather.indexOf("雨") != -1) {
        return this.bg_rainy;
      } else if (currentWeather.indexOf("晴") != -1) {
        return this.bg_sunny;
      } else if (currentWeather.indexOf("阴") != -1) {
        return this.bg_overcast;
      } else {
        return this.bg_cloudy;
      }
    },

    // 改变标题城市
    changeTitle() {
      this.$bus.$emit(
        "activeIndex",
        this.$refs.mySwiper.swiperInstance.activeIndex
      );
    },

    // 点击天气指数打开对应详情
    openIndex(index) {
      this.currentWeatherIndex = index;
      this.maskShow = !this.maskShow;
    },

    // 点击mask层关闭天气指数框
    maskClick() {
      this.maskShow = !this.maskShow;
    }
  },
};
</script>

<style scoped>
.home-swiper {
  height: 100%;
}

.swiper {
  /* height: calc(100% - 44px); */
  height: 100%;
}

.swiper-content {
  width: 100vh;
  padding: 10px 5px 0;
  position: relative;
}

.swiper-pagination {
  position: fixed;
  left: 50%;
  top: 22px;
  transform: translateX(-50%);

  width: 50%;
  height: 20px;
}

.degree {
  padding-top: 25px;
  font-size: 47px;
  font-weight: 700;
}

.weather {
  margin-top: 4px;
  font-size: 13px;
}

.update_time {
  margin-top: 10px;
  font-size: 13px;
}

.hum_pre {
  position: absolute;
  bottom: 205px;
  left: 5px;
  right: 5px;
  display: flex;
  margin-top: 150px;
  font-size: 14px;
  text-align: center;
}

.hum_pre span {
  flex: 1;
}

.division {
  width: 20px;
  color: #146612;
}

.weather-index {
  position: absolute;
  bottom: 125px;
  left: 5px;
  right: 5px;
}

.weather-future {
  position: absolute;
  bottom: 10px;
  left: 5px;
  right: 5px;
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vh;
  height: 100vh;

  z-index: 10;
}
</style>