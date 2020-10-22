let ENV = process.env.NODE_ENV
const install = (Vue) => {
  if (ENV !== 'prd') return

  Vue.config.errorHandler = (err, vm, info) => {
    let con = console
    con.error(err)
    try {

    } catch (e) {
      con.error(e)
    }
  }
}

export default install
