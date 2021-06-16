<template>
  <swiper>
      <swiper-item v-for="item in banner" :key="item.acm">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="swiperImageLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name: 'HomeSwiper',
  props: {
    banner: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    swiperImageLoad() {
      this.$emit('swiperImageLoad');
    }
  }
}
</script>

<style scoped>

</style>