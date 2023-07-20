const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  devServer:{
    host: '0.0.0.0',
    port: 8081,
    client: {
      webSocketURL: 'ws://0.0.0.0:8081/ws',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },

  transpileDependencies: true
})
