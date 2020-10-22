module.exports = {
  plugins: {
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 7']
    },
    'postcss-pxtorem': {
      rootValue: 12, //结果为：设计稿元素尺寸/12，比如元素宽750px,最终页面会换算成rem
      propList: ['*']
    }
  }
}