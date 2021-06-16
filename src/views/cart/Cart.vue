<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>

    <scroll class="content" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

import CartList from './childComponents/CartList'
import CartBottomBar from './childComponents/CartBottomBar'

// vuex内置方法 导入store的getters
import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  components: {
    NavBar,
    Scroll,
    CartList,
    CartBottomBar
  },
  computed: {
    // 方法一
    // ...mapGetters(['cartLength'])
    // 方法二
    ...mapGetters({
      length: 'cartLength'
    })

  },
  activated() {
    this.$refs.scroll.refresh();
  }
}
</script>

<style scoped>
  #cart {
    position: relative;
    height: 100vh;
  }

  .nav-bar {
    position: relative;
    z-index: 9;
    background-color: var(--color-tint);
    color: #fff;
  }

  .content {
    /* position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 89px; */
    overflow: hidden;
    height: calc(100% - 44px - 49px);
  }
</style>