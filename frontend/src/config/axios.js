import axios from 'axios'

const success = response => response
const error = error => {
    if(error.response.status === 401) {
        window.location = '/'
    } else {
        return Promise.reject(error)
    }
}

axios.interceptors.response.use(success, error)