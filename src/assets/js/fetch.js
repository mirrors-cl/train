import axios from 'axios'



let instance = axios.create({
  timeout: 5000,

  baseURL: process.env.NODE_ENV == 'development' ? 'http://localhost:8080/api':''
})

  export default instance

