module.exports = {
  // set your styleguidist configuration here
  title: 'pc-组件库',
  components: 'src/components/**/[A-Z]*.vue',
  defaultExample: true,
  styleguideDir: 'dist',
  codeSplit: true,
  skipComponentsWithoutExample: true,
  usageMode: 'expand',
  // exampleMode: 'expand',
  webpackConfig: {
    devServer: {
      proxy: {
        '/v1/playbook/user_upload': {
          target: 'http://10.0.186.6:8355',
          changeOrigin: true,
          ws: false,
        },
        '/v1/event/admin': {
          target: 'http://10.0.186.6:8341',
          changeOrigin: true,
          pathRewrite: {
            '^/v1/event/admin': '/v1/event/admin'
          }
        },
        '/v1': {
          target: 'http://10.0.186.6:8355',
          changeOrigin: true,
          pathRewrite: {
            '^/v1': '/v1'
          }
        }
      }
    }
  }
  // sections: [
  //   {
  //     name: 'First Section',
  //     components: 'src/components/**/[A-Z]*.vue'
  //   }
  // ],
  // webpackConfig: {
  //   // custom config goes here
  // }
}
