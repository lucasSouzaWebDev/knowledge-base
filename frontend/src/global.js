import Vue from 'vue'

export const baseApiUrl = 'http://localhost:3000'

export function showError(error) {
    if(error && error.response && error.response.data){
        Vue.toasted.global.defaultError({ msg: e.response.data })
    } else if(typeof e === 'string'){
        Vue.toasted.global.defaultError({ msg: e })
    } else{
        Vue.toasted.global.defaultError()
    }
}