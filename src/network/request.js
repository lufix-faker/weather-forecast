import axios from 'axios'
require('../mock/mock')

export function request(config) {

  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })


  instance.interceptors.request.use(config => {
    return config
  },err => {
    console.log(err);
  })

  instance.interceptors.response.use(res => {
    return res.data
  },err => {
    console.log(err);
  })

  return instance(config)

}

// 自己创建的接口
export function request2(config) {
  const instance2 = axios.create({
    baseURL: 'http://127.0.0.1:8001',
    timeout: 5000
  })

  instance2.interceptors.request.use(config => {
    return config
  },err => {
    console.log(err);
  })

  instance2.interceptors.response.use(res => {
    return res.data
  },err => {
    console.log(err);
  })

  return instance2(config)
}

// mockjs模拟数据
// detail数据
export function request3(config) {
  return axios({
    url: '/detail'
  })
}

// home的数据
export function request4(config) {
  return axios({
    url: '/home/data'
  })
}

// detail的recommend数据
export function request5(config) {
  return axios({
    url: '/recommend'
  })
}
