import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: '/api/weather/common',
    timeout: 5000
  })

  // 添加请求拦截器
  instance.interceptors.request.use((config) => {
    return config;
  }, (err) => {
    console.log(err);
  })

  // 添加响应拦截器
  instance.interceptors.response.use((res) => {
    return res.data;
  }, (err) => {
    console.log(err);
  })

  return instance(config);
}

export function request2(config) {
  const instance2 = axios.create({
    baseURL: '/weather/data/city3jdata',
    timeout: 5000
  })

  // 添加请求拦截器
  instance2.interceptors.request.use(res => {
    return res
  }, err => {
    console.log(err);
  })

  // 添加响应拦截器
  instance2.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })

  return instance2(config);
}
