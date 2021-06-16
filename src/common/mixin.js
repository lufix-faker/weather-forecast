import { debounce } from './utils'

import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
  // data也可以封装
  data() {
    return {
      itemListener: null,
    }
  },
  mounted() {
    let refresh = debounce(this.$refs.scroll.refresh, 200);

    this.itemListener = () => {
      refresh();
    }
    this.$bus.$on('itemImageLoad', this.itemListener);
  }
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  components: {
    BackTop
  },
  methods: {
    // 返回顶部
    backTop() {
      // this.$refs.scroll.scroll.scrollTo(0,0,500);
      // 使用封装的方法
      this.$refs.scroll.scrollTo(0, 0);
    },
  }
}