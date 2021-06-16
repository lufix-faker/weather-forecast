<template>
  <div class="goods-list-item" @click="itemClick">
    <a href="javascript:;">
      <img :src="getImage" alt="" @load="itemImageLoad" />
      <div class="goods-info">
        <p>{{ goodsItem.title }}</p>
        <span class="price">{{ goodsItem.price }}</span>
        <span class="collect">{{ goodsItem.buyCount }}</span>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    getImage() {
      return this.goodsItem.cover || this.goodsItem.image;
    },
  },
  methods: {
    itemImageLoad() {
      // 发送事件到事件总线
      this.$bus.$emit('itemImageLoad');

      // if (this.$route.path.indexOf('/home')!==-1) {
      //   this.$bus.$emit('homeItemImageLoad');
      // }else if(this.$route.path.indexOf("/detail")!==-1) {
      //   this.$bus.$emit("detailItemImageLoad");
      // }

    },
    itemClick() {
      this.$router.push("/detail/" + this.goodsItem.id);
    },
  },
};
</script>

<style scoped>
.goods-list-item {
  width: 48%;
  padding-bottom: 40px;
  position: relative;
}

.goods-list-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  overflow: hidden;
  font-size: 12px;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-list-item .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  /* background: url("~assets/img/common/collect.svg") 0 0/14px 14px ;  */
  background: url("~assets/img/common/collect.svg") rgba(0, 0, 0, 0);
  background-position: 14px 14px;
  background-size: 14px 14px;
}
</style>