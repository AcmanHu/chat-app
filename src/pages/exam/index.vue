<template>
  <div class="exam">
    <i-row i-class="myrow">
      <i-col span="16" i-class="mycol">
        <span class="span1">{{name}}</span>
      </i-col>
      <i-col span="8" i-class="mycol mycol1">
        <span class="span2">
          <i-button i-class="mybutton" @click="exit" type="info" inline="true">退出</i-button>
        </span>
      </i-col>
    </i-row>
    <i-modal title="退出登陆" :visible="visible5" :actions="actions5" @click="sureExit">
        <view>退出登陆后记得要重新登陆哦！</view>
    </i-modal>
    <i-message id="message" />

    <h4 class="tagh4">考试场次:</h4>

    <i-row i-class="rowclass rowclass1">
      <i-col span="4" i-class="colclass">批次</i-col>
      <i-col span="6" i-class="colclass">开考时间</i-col>
      <i-col span="5" i-class="colclass">地点</i-col>
      <i-col span="4" i-class="colclass">余量</i-col>
      <i-col span="5" i-class="colclass">操作</i-col>
    </i-row>

    <i-row i-class="rowclass rowclass2" v-for="(item,key) in datatest" :key="key">
      <i-col span="4" i-class="colclass">{{item.id}}</i-col>
      <i-col span="6" i-class="colclass">
        <div class="data">
          <span>{{item.newdate[0]}}</span>
           </br>
           <span>{{item.newdate[1]}}</span>
        </div>
      </i-col>
      <i-col span="5" i-class="colclass">{{item.place}}</i-col>
      <i-col span="4" i-class="colclass">{{item.remain}}</i-col>
      <i-col span="5" i-class="colclass" @click="startSub(key)" style="color:blue;">立即预约</i-col>
    </i-row>


    <div class="caseContent" v-if="datatest==''">
      <i-load-more tip="暂无数据" :loading="loading"/>
    </div>

    <div class="remind">
      <p class="remindTitle">温馨提醒：</p>
      <div class="remindContent">
        <p>1.考试时间为60分钟</p>
        <p>2.请提前十分钟进场</p>
      </div>
    </div>

    <i-modal title="提醒" :visible="visible1" @ok="CloseOK" @cancel="CloseCancel">
        <view>预约后将无法修改和取消！是否继续</view>
    </i-modal>

    <h4 class="tagh4">我的预约:</h4>

    <i-row i-class="rowclass rowclass1">
      <i-col span="4" i-class="colclass">批次</i-col>
      <i-col span="6" i-class="colclass">考试时间</i-col>
      <i-col span="5" i-class="colclass">地点</i-col>
      <i-col span="4" i-class="colclass">状态</i-col>
      <i-col span="5" i-class="colclass">成绩</i-col>
    </i-row>

    <i-row i-class="rowclass rowclass2" v-for="(item,key) in dataUserInfo" :key="key">
      <i-col span="4" i-class="colclass">{{item.exam_id}}</i-col>
      <i-col span="6" i-class="colclass">
        <div class="data">
          <span>{{item.newdate[0]}}</span>
           </br>
           <span>{{item.newdate[1]}}</span>
        </div>
      </i-col>
      <i-col span="5" i-class="colclass">{{item.place}}</i-col>
      <i-col span="4" i-class="colclass" style="color:blue;">{{item.status == 0?'待考':'已考'}}</i-col>
      <i-col span="5" i-class="colclass">{{item.score == null?'0':item.score}}</i-col>
    </i-row>

    <div class="caseContent" v-if="dataUserInfo==''">
      <i-load-more tip="暂无数据" :loading="loading"/>
    </div>
  </div>
</template>
<script>
import store from '../counter/store'
const { $Message } = require('../../../static/iview/base/index');
import { http, httpPut } from '@/utils/index'
import IP  from '@/utils/ip'
export default {
  data () {
    return {
      name:"请登录",
      number:"",
      loading:false,
      visible1: false,
      visible5: false,
      hintMsg:'',
      exam:'',
      actions5: [
        {
            name: '取消'
        },
        {
            name: '确认',
            color: '#ed3f14',
            loading: false
        }
      ],
      list:[],
      datatest:[],
      dataUserInfo:[]
    }
  },

  components: {
  },
  computed:{

  },
  methods: {
    startSub(key){
      this.exam = this.datatest[key].id
      this.visible1 = true
    },
    //点击退出的提示内容
    exit(){  
      store.commit('offLoginStatus')
      this.visible5 = true
    },
    //点击预约的提示内容
    CloseOK(){
      httpPut(IP + 'computercultrue/index.php/exam/' + this.number, wx.getStorageSync("token"), this.exam, (data)=>{
        console.log(data)
        if(data.code == 0){
            wx.showToast({ //错误则弹出提示信息
              title:data.msg,
              duration:1500,
              icon:'none'
            })
        }else{
          wx.showToast({ //成功则弹出提示信息
            title: data.msg,
            duration: 1500,
            icon: 'none'
          })
        }
      })
      this.visible1 = false
      this.getUserInfo()
    },
    CloseCancel(){
      this.visible1 = false
    },
    sureExit (detail) {
      // console.log(detail.index)
      if (detail.index === 0) {
          this.visible5 = false
      } else {
          const action = [...this.actions5];
          action[1].loading = true;
          this.actions5 = action
          setTimeout(() => {
              action[1].loading = false;  
              this.visible5 = false
              this.actions5 = action
              $Message({
                  content: '退出成功！',
                  type: 'success'
              });
              setTimeout(() => {
                const url = '../login/main'
                wx.reLaunch({ url })
                wx.clearStorageSync()
              },1000)
          }, 2000);
      }
    },
    getInfo(){//获取学生可报名的场次
    console.log(1)
      http(IP+'computercultrue/index.php/exam', wx.getStorageSync("token"), (data)=>{
        this.datatest = []
        var arr = data.msg
        // console.log(arr)
        let one = {}
        for (const i in arr) {
          let newdata = arr[i].date.split(" ")
          one = arr[i]
          one['newdate'] = newdata
          one['remain'] = arr[i].total_mount - arr[i].current_mount
          this.datatest.push(one)
        }
      })
    },
    getUserInfo(){ //获取学生已报名的信息
      http(IP+'computercultrue/index.php/exam/'+this.number, wx.getStorageSync("token"), (data)=>{
        console.log(data)
        this.dataUserInfo = []
        var arr = data.msg
        // console.log(arr)
        let two = {}
        for (const i in arr) {
          let newdata2 = arr[i].date.split(" ")
          two = arr[i]
          two['newdate'] = newdata2
          this.dataUserInfo.push(two)
        }
        console.log(this.dataUserInfo)
      })
    }
  },
  onLoad (option) {//获取登陆的用户信息  姓名和学号
    console.log(option)
    this.number = option.number
    this.name = option.name
  },
  mounted () {
    this.getInfo()
    this.getUserInfo()
  },
  
}
</script>

<style>
.exam{
  height: 100%;
}
.myrow{
  background: #83c0ff;
  display: block;
  height: 40px;
  line-height: 40px;
 
}
.mycol {    
  color: #fff;
} 
.mycol span{
  margin: 0 10px;
}
.mycol1{
  text-align: right;
}
.mycol .span2 .mybutton{
  margin: 0;
  height: 30px;
  line-height: 30px;
  /* top: -2px; */
}
.tagh4{
  padding: 5px;
  font-weight: bold;
}
.rowclass{
  text-align: center;
  font-size: 14px;
}
.rowclass1{
  border: 1px solid #ebeef5;
}
.rowclass1 .colclass{
  padding: 10px 0;
}
.rowclass2{
  border: 1px solid #ebeef5;
  border-top: none; 
}
.rowclass2 .colclass{
  padding: 20px 0;
}
.caseContent{
  border: 1px solid #ebeef5;
  border-top: none; 
}
.exam .remind{
  height: 80px;
  border: 1px solid #ebeef5;
  border-top: none; 
}
.exam .remind .remindTitle{
  color: red;
  font-size: 14px;
  padding: 5px;
}
.exam .remind .remindContent{
  margin-top: 4px; 
  padding-left: 60px;
  font-size: 14px;
}
.exam .remind .remindContent p{
  margin-bottom: 2px;
}
</style>  
