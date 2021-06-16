<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <tab-control
      :titles="titles"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control1"
      v-show="isFixedTabControl"
    />

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @contentScroll="contentScroll"
      :pull-up-load="true"
      @pullUp="loadMore"
    >
      <home-swiper :banner="banner" @swiperImageLoad="swiperImageLoad" />
      <home-recommend-view :recommend="recommend" />
      <feature-view />
      <tab-control :titles="titles" @tabClick="tabClick" ref="tabControl2" />
      <goods-list :goods="goods[tabType].list" />

      
    
    </scroll>

    <back-top @click.native="backTop" v-show="isShowBackTop" />
  </div>
</template>

<script scoped>
import HomeSwiper from "./childComponents/HomeSwiper";
import HomeRecommendView from "./childComponents/HomeRecommendView";
import FeatureView from "./childComponents/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods, getMockHomeGoods } from "network/home";

import { debounce } from "common/utils";
import { itemListenerMixin } from "common/mixin"

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banner: [],
      recommend: [],
      titles: ["流行", "新款", "精选"],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      tabType: "pop",
      isShowBackTop: false,
      tabControlOffsetTop: 0,
      isFixedTabControl: false,
      saveY: 0,
    };
  },
  created() {
    // 获取多个数据
    this.getHomeMultidata();

    // 获取首页商品数据
    // this.getHomeGoods("pop");
    // this.getHomeGoods("new");
    // this.getHomeGoods("sell");

    // 获取模拟数据
    this.getMockHomeGoods("pop");
    this.getMockHomeGoods("new");
    this.getMockHomeGoods("sell")
  },
  mixins: [itemListenerMixin],
  mounted() {
    /* GoodsListItem图片加载事件总线 */
    // 没有使用防抖debounce
    // this.$bus.$on("itemImageLoad", () => {
    //   console.log("图片加载完成");
    //   this.$refs.scroll.refresh();
    // });

    // 第一种写法
    // let refresh = debounce(this.$refs.scroll.refresh, 200);
    // this.$bus.$on("homeItemImageLoad", () => {
    //   refresh();
    // });

    // 第二种写法
    // let refresh = debounce(this.$refs.scroll.refresh, 200);

    // this.itemListener = () => {
    //   refresh();
    // };
    // this.$bus.$on("itemImageLoad", this.itemListener);

    // 第三种直接封装到mixin

  },
  // 页面活跃时
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  // 跳出页面时
  deactivated() {
    // 1.保存y值
    this.saveY = this.$refs.scroll.getScrollY();
    // console.log(this.saveY);

    // 2.取消全局的监听事件 (GoodsListItem发送的事件总线监听)
    // 如果只写一个参数 会取消到所有事件总线监听
    this.$bus.$off("itemImageLoad", this.itemListener);
  },
  methods: {
    /* 事件监听的方法 */
    // tabControl切换监听
    tabClick(index) {
      switch (index) {
        case 0:
          this.tabType = "pop";
          break;
        case 1:
          this.tabType = "new";
          break;
        case 2:
          this.tabType = "sell";
          break;
      }

      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 返回顶部
    backTop() {
      // this.$refs.scroll.scroll.scrollTo(0,0,500);
      // 使用封装的方法
      this.$refs.scroll.scrollTo(0, 0);
    },
    // 滚动事件
    contentScroll(position) {
      // 返回顶部按钮显示与隐藏
      // console.log(position);
      this.isShowBackTop = -position.y > 400;

      // tabControl吸顶
      this.isFixedTabControl = -position.y > this.tabControlOffsetTop;
    },
    // 上拉加载更多
    loadMore() {
    // this.getHomeGoods(this.tabType);
    // this.getMockHomeGoods(this.tabType);

      this.$refs.scroll.finishPullUp();
    },
    // 轮播图图片加载完成
    swiperImageLoad() {
      // 所有组件都有一个属性$el 用于获取组件中的元素
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabControlOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /* 网络请求 */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        // this.goods[type].list.push(...res.data.list);
        // this.goods[type].page += 1;
        // console.log(res.data.rows);
        this.goods[type].list.push(...res.data.rows);
      });
    },
    // 模拟网络请求
    getMockHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getMockHomeGoods(type, page).then(res => {
        if(type == "pop") {
          this.goods[type].list.push(...res.data.pop);
        }else if(type == "new") {
          this.goods[type].list.push(...res.data.new);
        }else if(type == "sell") {
          this.goods[type].list.push(...res.data.sell);
        }
      })
    }
  },
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

/* .tab-control {
  position: sticky;
  top: 44px;
  background-color: #fff;
  z-index: 9;
} */

/* 因为在better-scroll中是使用transfrom: translate来实现滚动的 */
/* position: fixed会脱离标准流 结果是走到很靠上的地方 */
/* .isFixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
} */

.tab-control1 {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  /* height: calc(100% - 44px); */
  overflow: hidden;
}
</style>