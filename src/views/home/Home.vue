<template>
  <div id="home">
    <home-top-bar></home-top-bar>
    <home-swiper></home-swiper>
  </div>
</template>

<script>
import HomeTopBar from './components/HomeTopBar'
import HomeSwiper from "./components/HomeSwiper";

export default {
  name: "Home",
  components: {
    HomeTopBar,
    HomeSwiper,
  },
  
};
</script>

<style scoped>
  #home {
    height: 100vh;
  }
  
</style>