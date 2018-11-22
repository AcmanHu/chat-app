<template>
  <div class="login">
    <div class="bg">
      <img class="bgimg" mode="" src="../../../static/img/login.png" alt="图片加载中...">  
    </div>
    <div class="content">
      <div>
        <i-input i-class="name" :value="value1" @change="changeNumber" type="number" mode="normal" title="学号：" placeholder="请输入学号" /> 
      </div>
      <div>
        <i-input i-class="name" :value="value2" @change="changeName"  type="text" mode="normal" title="姓名：" placeholder="请输入姓名" />
      </div>
      <div style="margin-top:40px;">
        <i-button @click="login" type="primary" :loading="status" size="default">{{msg}}</i-button>
      </div>
    </div>
  </div>
</template>

<script>
//引入vuex 管理
import store from '../counter/store'
import { http } from '@/utils/index'
import IP  from '@/utils/ip'
export default {
  data () {
    return {
      value1: '',
      value2: '',
    }
  },
  components: {
  },
  computed: {
    msg(){
      return store.state.msg //设置登陆时的字的显示 “登陆中...”
    },
    status(){
      return store.state.status //设置登陆的状态
    }
  },
  methods: {
    changeNumber(event){
      this.value1 = event.target.detail.value
    },
    changeName(event){
      this.value2 = event.target.detail.value
    },
    login(){
        var name =  this.value2  
        var number =  this.value1
        wx.request({
        url: IP+'computercultrue/index.php/login',
        method:'POST',
        data:{
          number:number,
          name:name
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success (res) {
          console.log(res)
          if(res.data.code === 1){
            wx.setStorageSync("token", res.data.msg)//token 存储到本地的storge
            store.commit('setLoginStatus') // vuex 设置登陆的状态
            setTimeout(
            ()=>{
              const url = '../exam/main?name=' + name + '&&number=' + number
              wx.reLaunch({ url })
            },1000)
          }else{
            wx.showToast({ //错误则弹出提示信息
              title:res.data.msg,
              duration:1500,
              icon:'none'
            })
          }
        },
        fail (err) {  
          console.log(err)
        }
      })
      

    }
  },
  created () {
   
  }
}
</script>

<style>
  .login{
    min-height: 100%;
    height: 100%;
    width: 100%;
    position: relative;
    /* background: yellow; */
  }
  .bg{
    height: 100%;
    width: 100%;
    /* background: blue; */
    position: absolute;
    z-index: 1;
  }
  .bg .bgimg{
    height: 100%;
    width: 100%;
    display: block;
  }
  .login .content{
    height: 200px;
    /* background: red; */
    position: relative;
    z-index: 3;
    top: 51%;
    padding: 20px;
  }
  .aa{
    margin-top: 500px;  
  }
  .login .content .name{
    margin-bottom: 10px;
    border: 1px solid #dcdfe6;
  }
</style>
