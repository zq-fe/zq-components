import axios from 'axios'
import {
  Message
} from 'element-ui'
import { isEmpty } from './utils'

const service = axios.create({
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['Inframe-Client-Id'] = localStorage.getItem('fingerprint')
    if (!isEmpty(config.params)) {
      for (const key in config.params) {
        if (isEmpty(config.params[key])) {
          delete config.params[key]
        }
      }
    }
    if (!isEmpty(config.data)) {
      for (const key in config.data) {
        if (isEmpty(config.data[key])) {
          delete config.data[key]
        }
      }
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  // response => response,
  response => {
    const result = response.data
    if (result && result.errno) {
      Message({
        message: result.errmsg,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    }
    return result
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
