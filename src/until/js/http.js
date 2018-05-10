import Lockr from 'lockr'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost/yingdun-api/v1/' 
axios.defaults.timeout = 1000 * 15
axios.defaults.headers.authKey=Lockr.get('authKey')
axios.defaults.headers.sessionId=Lockr.get('sessionId')
//axios.defaults.headers.authorization = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjAsInJvbGUiOjAsImFkbWluSWQiOjEsImV4cGlyZURhdGUiOjE1MjU0MTk3NjMsInJlZnJlc2hEYXRlIjoxNTI1NDE5ODIzLCJhdXRobGlzdCI6W119.Y6c3bqmmhk4MY4sKhNyOs3ILRDsKEqi58q6p2x4aWnI'
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
export default {
    apiGet(url, data) {
        return new Promise((resolve, reject) => {
          axios.get(url, data).then((response) => {
            resolve(response.data)
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
          }).catch((response) => {
            resolve(response)
            window.$message.warn('请求超时，请检查网络')
          })
        })
    },
}