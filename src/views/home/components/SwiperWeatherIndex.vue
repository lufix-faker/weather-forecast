<template>
  <div class="weather-index">
    <div
      class="index-box"
      v-for="(item, index) in img"
      :key="index"
      @click="openIndex(index)"
    >
      <img :src="img[index]" alt="" />
      <p>{{ word[index] }}</p>
    </div>

  </div>
</template>

<script>
import img_umbrella from "assets/img/weatherIndex/umbrella.jpeg";
import img_clothes from "assets/img/weatherIndex/cloth.jpeg";
import img_rays from "assets/img/weatherIndex/rays.jpeg";

export default {
  name: "SwiperWeatherIndex",
  data() {
    return {
      img: [img_umbrella, img_clothes, img_rays],
      word: ["雨伞指数", "穿衣指数", "紫外线指数"],
    };
  },
  methods: {
    // 点击对应指数
    openIndex(index) {
      this.$emit('openIndex', index);
    }
  }
};
</script>

<style scoped>
.weather-index {
  display: flex;
  height: 72px;

  background-color: #c9e0ca;
  border-radius: 10px;
  opacity: 0.65;
}

.index-box {
  flex: 1;
  text-align: center;
  margin-top: 8px;
  padding-top: 5px;
  margin-bottom: 8px;
  font-size: 12px;
}

.index-box:nth-child(-n + 2) {
  border-right: 2px solid #146612;
}

.index-box img {
  width: 30px;
  margin-bottom: 3px;
}


</style>