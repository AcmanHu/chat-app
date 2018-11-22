// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    status:false, //点击登陆 按钮的状态
    msg:'登陆',  //登陆的文字
  },
  mutations: {
    increment(state){
      const obj = state
      obj.count += 1
    },
    decrement(state){
      const obj = state
      obj.count -= 1
    },
    setLoginStatus(state){ //登陆后的状态
      const obj = state
      obj.status = true
      obj.msg = '登陆中...'
    },
    offLoginStatus(state){ //退出登陆的状态
      const obj = state
      obj.status = false
      obj.msg = '登陆'
    }
  }
})

export default store
