import Lockr from 'lockr'
import axios from 'axios'
import {withRouter} from 'react-router-dom';
axios.defaults.baseURL = 'http://localhost/yingdun-api/v1/' 
axios.defaults.timeout = 1000 * 15
axios.defaults.headers.authKey=Lockr.get('authKey')
axios.defaults.headers.sessionId=Lockr.get('sessionId')
//axios.defaults.headers.authorization = 'eyJ0eXAiOiJKV1QiLCJhbeyJ1c2VySWQiOjAsInJvbGUiOjAsImFkbWluSWQiOjEsImV4cGlyZURhdGUiOjE1MjU0MTk3NjMsInJlZnJlc2hEYXRlIjoxNTI1NDE5ODIzLCJhdXRobGlzdCI6W119.Y6c3bqmmhk4MY4sKhNyOs3ILRDsKEqi58q6p2x4aWnI'
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
export default {
    apiGet(url, data) {
        return new Promise((resolve, reject) => {
          axios.get(url, data).then((response) => {
            resolve(response.data)
            if(response.data.code==101){
              window.$message.warn('登录已失效，请重新登录')
              // window.location.href('./login')
              console.log(withRouter)
            }
          }, (response) => {
            reject(response)
            window.$message.warn('请求超时，请检查网络')
          })
        })
    },
    apiPost(url, data) {
        return new Promise((resolve, reject) => {
          axios.post(url, data).then((response) => {
            resolve(response.data)
            if(response.data.code==101){
              window.$message.warn('登录已失效')
            }
          }).catch((response) => {
            resolve(response)
            window.$message.warn('请求超时，请检查网络')
          })
        })
    },
}