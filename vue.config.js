// 修改webpack配置
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
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://suggest.taobao.com',
  //       // 允许跨域
  //       changOrigin: true,
  //       pathRewrite: {
  //         // 重写路径
  //         '^/api': ''
  //       }
  //     }
  //   }
  // }
}