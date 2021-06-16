import { request } from './request'

/* 空气状况air */
export function getAir(province, city) {
  return request({
    params: {
      source: 'pc',
      weather_type: 'observe|index|rise|alarm|air|tips|forecast_24h',
      province,
      city
    }
  })
}

/* 未来几天天气forecast_24h */
export function getFuture(province, city) {
  return request({
    params: {
      source: 'pc',
      weather_type: 'forecast_24h',
      province,
      city
    }
  })
}

/* 各类指标index */
export function getIndex(province, city) {
  return request({
    params: {
      source: 'pc',
      weather_type: 'index',
      province,
      city
    }
  })
}

/* 天气状况observe */
export function getObserve(province, city) {
  return request({
    params: {
      source: 'pc',
      weather_type: 'observe',
      province,
      city
    }
  })
}

export class WeatherIndex {
  constructor(index) {
    this.umbrella = index.umbrella;
    this.clothes = index.clothes;
    this.ultraviolet = index.ultraviolet;
  }
}
