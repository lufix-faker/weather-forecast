import Vue from 'vue'
import Vuex from 'vuex'

// 安装vuex插件
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    futureWeather: [],
    cityList: [
      { province: "广东", city: "广州" }
    ],
    observe: [],
    topBarColor: '#87ceeb'
  },
  mutations: {
    // cityList传入vuex
    setCityList(state, payload) {
      state.cityList = payload;
    },
    // 添加城市进cityList
    addCityList(state, payload) {
      state.cityList.push(payload);
    },
    // 初始化cityList
    initCityList(state, payload) {
      state.cityList = [
        { province: "广东", city: "广州" }
      ]
    },
    // 未来几天的天气状况传入vuex
    setFutureWeather(state, payload) {
      state.futureWeather = payload;
    },
    // 当前天气状况observe传入vuex
    setObserve(state, payload) {
      state.observe = payload;
    },
    // 改变顶部颜色
    setTopBarColor(state, payload) {
      state.topBarColor = payload;
    },
    
  },
  actions: {},
  getters: {},
  modules: {}
})

export default store
