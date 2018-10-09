import axios from 'axios'

const URL = 'http://0.0.0.0:5000/' //refatorar

const cliente = axios.create({
    baseURL: URL,
    withCredentials: true
})

export default cliente