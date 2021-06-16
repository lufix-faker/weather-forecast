import Toast from './Toast'

const obj = {}

// Vue.use(xxx)会执行xxx.install函数
obj.install = function(Vue) {
  // 1.创建组件构造器
  const toastConstructor = Vue.extend(Toast);

  // 2.new的方式 根据组件构造器 创建一个组件对象
  const toast = new toastConstructor();

  // 3.将组件对象 手动挂载到某一元素上
  toast.$mount(document.createElement('div'));

  // 4.toast.$el对应的是div
  document.body.appendChild(toast.$el);

  // 5.给Vue原型链上注册$toast
  Vue.prototype.$toast = toast;
}

export default obj