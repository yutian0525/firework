<template>
    <div class="container">
      <FireWork v-model:showWord="showW"/>
      <div class="word">


      <Typed v-if="showW" :typedList="['测试打字机第一行', '测试第二行', '测试第3行123456789989374857983794579837495739847673495ihdjfhjkdhfkjshdkjfsh看见反函数空间的恢复健康数据库的和反抗精神地方数据库和对方数据数据库和对方会计师和大家开发和速度快的', '测试第4行']" class="type"/>
      </div>
    </div>
  <div class="container2" v-if="!showW">
    <div class="card">
      <button @click="change" >测试</button>
    </div>

  </div>
</template>

<script>
import FireWork from '../components/FireworkType.vue'
import Typed from '../components/typed.vue'

	export default {
		data() {
			return {
				showW:false
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
  width: 900px;
  margin-top: 30px;
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
.card{
  width: 60%;
  height: 60%;
  background-color: #a6c0fe;
}
</style>