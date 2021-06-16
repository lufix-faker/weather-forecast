<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />

    <scroll
      class="content"
      ref="scroll"
      @contentScroll="contentScroll"
      :probe-type="3"
    >
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @loadImgEvent="imgLoad" />
      <detail-param-info :param-info="paramInfo" ref="param" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goods-list
        :goods="recommendInfo"
        @itemImageLoad="imgLoad"
        class="recommend"
        ref="recommend"
      />
    </scroll>

    <back-top @click.native="backTop" v-show="isShowBackTop" />
    <detail-bottom-bar @addToCart="addToCart" />
    <toast :message="message" :is-show="toastShow"></toast>
  </div>
</template>

<script>
import DetailNavBar from "./childComponents/DetailNavBar";
import DetailSwiper from "./childComponents/DetailSwiper";
import DetailBaseInfo from "./childComponents/DetailBaseInfo";
import DetailShopInfo from "./childComponents/DetailShopInfo";
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
import DetailParamInfo from "./childComponents/DetailParamInfo";
import DetailCommentInfo from "./childComponents/DetailCommentInfo";
import DetailBottomBar from "./childComponents/DetailBottomBar";

import GoodsList from "components/content/goods/GoodsList";

import Scroll from "components/common/scroll/Scroll";
import Toast from "components/common/toast/Toast";

import { mapActions } from "vuex";

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail";

import { debounce } from "common/utils";
import { itemListenerMixin, backTopMixin } from "common/mixin";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    Scroll,
    Toast,
  },
  data() {
    return {
      id: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendInfo: [],
      titleItemTopY: [],
      getTitleItemTopY: null,
      currentIndex: 0,
      message: "",
      toastShow: false,
    };
  },
  created() {
    // 获取当前商品id
    this.id = this.$route.params.id;

    // getDetail(this.id).then((res) => {
    //   console.log(res);
    //   // 1.获取顶部的图片轮播数据
    //   const data = res.result;
    //   this.topImages = data.itemInfo.topImages;

    //   // 2.获取商品信息
    //   this.goods = new Goods(
    //     data.itemInfo,
    //     data.columns,
    //     data.shopInfo.services
    //   );

    //   // 3.创建店铺信息的对象
    //   this.shop = new Shop(data.shopInfo);
    // });

    // 根据id获取详细商品数据
    getDetail(this.id).then((res) => {
      // console.log(res.data);
      // 1.获取顶部的图片轮播数据
      const data = res.data.result;
      this.topImages = data.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 4.保存商品详细数据
      this.detailInfo = data.detailInfo;

      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6.获取评论数据
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    // 获取推荐商品数据
    getRecommend().then((res) => {
      this.recommendInfo = res.data.list;
    });

    // 定义函数 获取标题点击对应模块的高度
    this.getTitleItemTopY = debounce(() => {
      this.titleItemTopY = [];

      this.titleItemTopY.push(0);
      this.titleItemTopY.push(this.$refs.param.$el.offsetTop);
      this.titleItemTopY.push(this.$refs.comment.$el.offsetTop);
      this.titleItemTopY.push(this.$refs.recommend.$el.offsetTop);

      // 添加一个最大值 在滚动监听时可以空间换时间
      this.titleItemTopY.push(Number.MAX_VALUE);
    }, 100);
  },
  mixins: [itemListenerMixin, backTopMixin],
  mounted() {
    /* GoodsListItem图片加载事件总线 */
    // 第一种写法
    // let refresh = debounce(this.$refs.scroll.refresh, 200);
    // this.$bus.$on('detailItemImageLoad', () => {
    //   refresh();
    // })
    // 第二种写法
    // let refresh = debounce(this.$refs.scroll.refresh, 200);
    // this.itemListener = () => {
    //   refresh();
    // }
    // this.$bus.$on('itemImageLoad', this.itemListener);
    // 第三种直接封装到mixin
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemListener);
  },
  methods: {
    // 详情页图片加载
    imgLoad() {
      this.$refs.scroll.refresh();

      this.getTitleItemTopY();
    },
    // 标题点击事件
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.titleItemTopY[index], 300);
    },
    // scroll滚动监听
    contentScroll(position) {
      /* 第一种写法 */
      // let length = this.titleItemTopY.length;
      // for (let i = 0; i < length; i++) {
      //   if (
      //     this.currentIndex !== i &&
      //     ((i < length - 1 &&
      //       position.y <= this.titleItemTopY[i] &&
      //       position.y > this.titleItemTopY[i + 1]) ||
      //       (i === length - 1 && position.y <= this.titleItemTopY[i]))
      //   ) {
      //     this.currentIndex = i;
      //     this.$refs.nav.currentIndex = i;
      //   }
      // }

      /* 第二种写法 */
      // this.titleItemTopY.push(Number.MAX_VALUE);
      let length = this.titleItemTopY.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          -position.y >= this.titleItemTopY[i] &&
          -position.y < this.titleItemTopY[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = i;
        }
      }

      // backTop模块
      this.isShowBackTop = -position.y > 400;
    },
    ...mapActions({
      addCart: "addToCart",
    }),
    // 添加到购物车
    addToCart() {
      // 保存该商品数据
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.newPrice;
      product.id = this.id;

      // 提交到vuex
      // this.$store.commit('addToCart', product);
      // this.$store.dispatch('addToCart', product);

      // this.$store.dispatch('addToCart', product).then(res => {
      //   console.log(res);
      // })

      this.addCart(product).then((res) => {
        // console.log(res);
        // this.message = res;
        // this.toastShow = true;

        // setTimeout(() => {
        //   this.toastShow = false;
        // }, 1000)

        this.$toast.show(res);
      });
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 44px;
  overflow: hidden;
  /* height: calc(100% - 44px); */
}

.recommend {
  margin-top: 5px;
}
</style>