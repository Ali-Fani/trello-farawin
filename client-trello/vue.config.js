const config = {
  devServer: {
    proxy: {
      '/api': 'http://localhost:8090',
    },
  },
}

module.exports = config
