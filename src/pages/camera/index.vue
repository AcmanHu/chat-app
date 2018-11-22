<template>
  <div id="camera">
    <camera device-position="front" flash="off" binderror="error" style="width: 100%; height: 300px;"></camera>
    <i-button type="ghost" @click="takePhoto">拍照</i-button>
    <i-divider  color="#2d8cf0" lineColor="#2d8cf0">图片预览</i-divider>
    <img mode="widthFix" height="0" :src="src"></img>
  </div>
</template>

<script>
import { http } from '@/utils/index'
export default {
  data () {
    return {
      src:''
    }
  },
  components: {
  },

  methods: {
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
   
  },
  created () {
  }
}
</script>

<style scoped>
  #camera p{
    text-align: center;
  }
</style>
