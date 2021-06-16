<template>
  <div class="cart-bottom-bar">
    <div class="select-all">
      <check-button :is-checked="isSelectAll" @click.native="checkBtnClick" />
      <span>全选</span>
    </div>
    <div class="total-price">
      <span>合计 ￥{{ totalPrice }}</span>
    </div>
    <div class="calculate">
      去计算({{ calcCount }})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkbutton/CheckButton'

import { mapGetters } from 'vuex'

export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    // 总价格计算
    totalPrice() {
      return this.cartList.filter(item => item.isChecked).reduce((preValue, item) => {
        return preValue + item.price * item.count;
      }, 0).toFixed(2)
    },
    // 商品总数计算
    calcCount() {
      return this.cartList.filter(item => item.isChecked).length;
    },
    // 全选状态判断
    isSelectAll() {
      if(this.cartList.length === 0) return false;

      // 方法一
      // return !(this.cartList.filter(item => !item.isChecked).length);
      // 方法二
      // return !this.cartList.find(item => !item.isChecked);
      // 方法三
      for(let item of this.cartList) {
        if(!item.isChecked) {
          return false;
        }
      }
      return true;

    }
  },
  methods: {
    // 点击全选按钮实现全选
    checkBtnClick() {
      if(this.isSelectAll) {
        // this.cartList.forEach(item => item.isChecked = false);
        this.$store.commit('changeIsChecked', false);
      }else {
        // this.cartList.forEach(item => item.isChecked = true);
        this.$store.commit('changeIsChecked', true);
      }
    }
  }
}
</script>

<style scoped>
  .cart-bottom-bar {
    position: relative;
    bottom: 40px;
    display: flex;

    height: 40px;

    background-color: #eee;
  }

  .select-all {
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 10px;
  }

  .select-all span {
    font-size: 14px;
    padding-left: 3px;
  }

  .total-price {
    flex: 1;
    font-size: 14px;
    line-height: 40px;
    margin-left: 20px;
  }

  .calculate {
    width: 100px;
    text-align: center;
    line-height: 40px;
    background-color: var(--color-high-text);
    color: #fff;
  }
</style>