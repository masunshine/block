import axios from 'axios'
// import Cookie from 'js-cookie'
import qs from 'qs'
// import router from '@/router/index'
import { Loading, Message } from 'element-ui'
let LoadingEntry = null
export const ERROK = 0
// const SERVERURL = 'http://10.8.0.147:3000/mock/41'
const SERVERURL = 'http://10.13.0.242:8087'
// const SERVERURL = 'http://10.16.0.251:8087'

let instance = axios.create({
  baseURL: SERVERURL,
  timeout: 10000,
  withCredentials: true
})

instance.interceptors.request.use(config => {
  // let token = Cookie.get('token') || ''
  // if (!token && !config.url.includes('cas.oauth.getTokenNew')) {
  //   // router.replace({path: '/login'})
  // } else {
  //   config.url.includes('cas.oauth.getTokenNew') || (config.headers.token = token)
  //   config.headers.appkey = config.appkey || '10131'
  //   config.headers.method = config.url.split('?')[1]
  // config.baseURL = '/api';
  config.headers.post['Content-Type'] = 'application/json';
  // }
  return config
})

instance.interceptors.response.use(function (res) {
  if (res.data.code === 100201 || res.data.code === 100202) {
    Message.closeAll()
    Message({
      type: 'error',
      message: res.data.msg
    })
    // router.replace({path: '/login'})
    return
  }
  return res
}, (error) => {
  let response = error.response
  if (response.data && response.data.code === 100201 || response.data.code === 100202) {
    // router.replace({path: '/login'})
  } else if (response.data.code === 403) {
    Message.closeAll()
    Message({
      type: 'warning',
      message: response.data.message
    })
  } else {
    Message.closeAll()
    Message({
      type: 'warning',
      message: '网络异常请稍后重试'
    })
  }
  return Promise.reject(error)
})

export const https = {
  get: (url) => {
    return new Promise((resolve, reject) => {
      instance.get(url).then((res) => {
        resolve(res.data)
      }).catch((e) => {
        reject(e)
      })
    })
  },
  post: (url, params) => {
    return new Promise((resolve, reject) => {
      instance.post(url, qs.parse(params)).then((res) => {
        resolve(res.data)
      }).catch((e) => {
        reject(e)
      })
    })
  },
  put: (url, params, config) => {
    if (config && config.load) {
      loading()
    }
    return new Promise((resolve) => {
      instance.put(url, params).then((res) => {
        if (config && config.load) {
          desLoad()
        }
        if (res.data.code === ERROK || res.data.status === ERROK) {
          resolve(res.data)
        } else {
          if (config) {
            config.cbno && config.cbno()
          }
          Message.closeAll()
          Message.error(res.data.message, {
            duration: 3000
          })
        }
      }).catch(() => {
        if (config) {
          config.load && desLoad()
          config.cbno && config.cbno()
        }
      })
    })
  },
  deletes: (url, params, config) => {
    if (config && config.load) {
      loading()
    }
    if (params) {
      if (getDataType(params) === 'Object') {
        url += (url.indexOf('?') < 0 ? '?' : '&') + setparams(params)
      } else if (getDataType(params) === 'Array') {
        url += params.join('/')
      }
    }
    return new Promise((resolve) => {
      instance.delete(url).then((res) => {
        if (res.data.code === ERROK || res.data.status === ERROK) {
          resolve(res.data)
        } else {
          config && (config.cbno && config.cbno())
          Message.error(res.data.message, {
            duration: 3000
          })
        }
        if (config) {
          config.load && desLoad()
          config.cbno && config.cbno()
        }
      }).catch(() => {
        if (config) {
          config.load && desLoad()
          config.cbno && config.cbno()
        }
      })
    })
  }
}

function loading() {
  LoadingEntry || (LoadingEntry = Loading.service({ fullscreen: true }))
}

function desLoad() {
  LoadingEntry.close()
}
/**
 * @param {Object} obj
 */
export function getDataType(obj) {
  if (obj === null) {
    return 'null'
  }
  if (obj === undefined) {
    return undefined
  }
  return Object.prototype.toString.call(obj).slice(8, -1)
}
/**
 * @param {Object} data
 */
function setparams(data) {
  let paramStr = ''
  for (var k in data) {
    var value = data[k] !== undefined ? data[k] : ''
    paramStr += `&${k}=${encodeURIComponent(value)}` // encodeURIComponent   把字符串作为 URI 组件进行编码。
  }
  return paramStr ? paramStr.substring(1) : ''
}
export const APPID = 'pF_eGF_KiQ50tJKHspFThw=='
global.ERROK = ERROK
