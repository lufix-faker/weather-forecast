export default {
  addCount(state, payload) {
    payload.count++;
  },
  addCart(state, payload) {
    payload.isChecked = true;
    state.cartList.push(payload);
  },
  changeIsChecked(state, payload) {
    state.cartList.forEach(item => item.isChecked = payload);
  }
}