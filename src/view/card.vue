<template>
    <div class="container">
      <FireWork v-model:showWord="showW"/>

    </div>
  <div class="container2" v-if="!showW">
    <div class="card">
      <div class="title">Ta送你了一张电子贺卡</div>
      <div class="p_1">
        <div class="t_1">To:</div>
        <div class="p_2">
          <img class="img_1" src="https://mypan.huorong.eu.org/raw/health/11.jpg" alt="">
          <div class="p_3">
            <div class="name">{{name}}</div>
            <div class="detail">{{detail}}</div>
          </div>
        </div>
      </div>
      <div style="height: 10px;">
      </div>
      <div class="p_1">
        <div class="t_1">From:</div>
        <div class="name">{{name}}</div>
      </div>
      <button class="but_1" @click="change">
          <img src="../static/right.svg" alt="" class="img_2">
      </button>
    </div>

  </div>
  <div class="container3" v-if="showW">
    <div class="word">
      <Typed v-if="showW" :typedList="['测试打字机第一行', '测试第二行', '测试第3行123456789989374857983794579837495739847673495ihdjfhjkdhfkjshdkjfsh看见反函数空间的恢复健康数据库的和反抗精神地方数据库和对方数据数据库和对方会计师和大家开发和速度快的', '测试第4行']" class="type"/>
    </div>
  </div>
</template>

<script>
import FireWork from '../components/FireworkType.vue'
import Typed from '../components/typed.vue'
	export default {
		data() {
			return {
				showW:false,
        name:'yutian',
        detail:'123123'
			}
		},
		methods: {
			change() {
				this.showW = !this.showW;
        console.log(this.showW);
			}
		},
		mounted() {

		},
        components: {
            FireWork,
            Typed
        }
	}
</script>

<style>
.container{
    width: 100%;
    height: 100vh;
}
body{
    background-color: #000000;
}
.type{
    z-index: 600;
    position: absolute;
}
.word{
  width: 70%;
  margin-left: 10%;
  margin-top: 5%;
}
.container2{
  position: absolute;
  z-index: 601;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container3{
  position: absolute;
  z-index: 602;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: left;
}
.card{
  width: 420px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px); /* 模糊半径为10像素 */
  border-radius: 20px;
  box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.1);
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.title{
  width: 100%;
  line-height: 30px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}
.t_1{
  line-height: 60px;
  font-size: 23px;
  font-weight: 600;
  color: #467dbf;
}
.p_1{
  width: 85%;
}
.p_2{
  display: flex;
  height: 70px;
}
.img_1{
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-right: 20px;
}
.p_3{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.name{
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
}
.detail{
  font-size: 16px;
  color: #999999;
  line-height: 26px;
}
.img_2{
  width: 35px;
  height: 35px;
}
.but_1{
  width: 70px;
  height: 70px;
  background-color: rgba(70, 125, 191, 0);
  border-radius: 50%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: #f2f2f2 2px solid;
}
.but_1:hover{
  background-color: rgba(255, 255, 255, 0.1);
}

</style>