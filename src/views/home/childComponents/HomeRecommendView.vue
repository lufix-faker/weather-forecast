<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommend" :key="item.acm">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script scoped>
export default {
  name: "HomeRecommendView",
  props: {
    recommend: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
  .recommend {
    display: flex;
    text-align: center;

    padding: 8px 0 30px;
    border-bottom: 10px solid #eee; 
  }

  .recommend-item {
    flex: 1;
    font-size: 14px;
  }

  .recommend-item img {
    width: 88%;
    margin-bottom: 3px;
  }
</style>