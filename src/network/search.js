import { request2 } from './request'
import city from '@/../public/city.json'

// 获取所有省份
export function getProvince() {
  return request2({
    url: 'china.html'
  })
}

// 根据省份获取所有城市
export function getCity(provinceCode) {
  return request2({
    url: 'provshi/'+ provinceCode +'.html'
  })
}

// 本地获取省份
export function getProvinceJSON() {
  return city.filter((item, index) => {
    let arr=[];
    city.forEach((item2,i) => {
      arr.push(item2.province);
    });
    return arr.indexOf(item.province) === index;
  })
}

// 本地获取城市
export function getCityJSON(province) {
  return city.filter(item => item.province == province)
}