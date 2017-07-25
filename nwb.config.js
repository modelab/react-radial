module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'RadialMenu',
      externals: {
        react: 'React'
      }
    }
  }
}
