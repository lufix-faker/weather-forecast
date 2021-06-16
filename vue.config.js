module.exports = {
  configureWebpack: {
    resolve: {
      extensions: [],
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://wis.qq.com',
        // 允许跨域
        changOrigin: true,
        pathRewrite: {
          // 重写路径
          '^/api': ''
        }
      },
      '/weather': {
        target: 'http://www.weather.com.cn',
        // 允许跨域
        changOrigin: true,
        pathRewrite: {
          // 重写路径
          '^/weather': ''
        }
      }
    }
  }
}