export default {
  // 添加商品到购物车
  addToCart(context, payload) {
    // let oldProduct = null;
    // for (let item of state.cartList) {
    //   if (item.id === payload.id) {
    //     oldProduct = item;
    //   }
    // }

    return new Promise((resolve, reject) => {
      // 简短写法
      let oldProduct = context.state.cartList.find(item => item.id === payload.id);

      if (oldProduct) {
        context.commit('addCount', oldProduct);
        resolve('商品数量加一');
      } else {
        payload.count = 1;
        context.commit('addCart', payload);
        resolve('添加商品到购物车');
      }
    })
  }
}