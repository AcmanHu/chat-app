<template>
  <div class="container">
     <i-button type="primary" @click="toCamera">点我进入相机</i-button>
    <!-- <card :text="userInfo"></card>
    <button @click="bindViewTap()">点击跳转</button> -->
    <!-- <audio :poster="poster" :name="name" :author="author" :src="src" id="myAudio" controls loop></audio> -->
    <!-- <camera device-position="front" flash="off" binderror="error" style="width: 100%; height: 300px;"></camera>
    <button type="primary" @click="takePhoto">拍照</button>
    <view>预览</view>
    <image mode="widthFix" :src="src"></image> -->
    <i-button type="ghost" @click="handleDefault">默认提醒</i-button>
  </div>
</template>

<script>

import card from '@/components/card'
import { http } from '@/utils/index'
export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: "我是HT",
      poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
      name: '此时此刻',
      author: '许巍',
      // src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
      src:''
    }
  },

  components: {
    card
  },

  methods: {
    toCamera () {
      const url = '../camera/main'
      wx.navigateTo({ url })
    },
    takePhoto() {
      const ctx = wx.createCameraContext();
      ctx.takePhoto({
        quality: 'high',
        success: (res) => {
          console.log(res)
          this.src = res.tempImagePath;
        }
      })
    },
    handleDefault(){
      $Message({
          content: '这是一条普通提醒'
    });
    }
    //   // 调用登录接口
    // getUserInfo () {
    //   wx.login({
    //     success: () => {
    //       wx.getUserInfo({
    //         success: (res) => {
    //           this.userInfo = res.userInfo
    //         }
    //       })
    //     }
    //   })
    // },
  },
  mounted () {
    http('https://wwtliu.com/sxtstu/music/baidu/list.php?type=1&count=5&offset=0',(data) => {
      console.log(data)
    })
    wx.showToast({
      title:'请注意查看考试信息',
      duration:1500,
      icon:'none'
    })
  },
  onUnload(){
    wx.reLaunch({
      url: '../camera/main'
    })
  }
}
</script>

<style scoped>
.camera{
  width: 50%;
  text-align: center;
}
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
