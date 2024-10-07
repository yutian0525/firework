<template>
  <div class="container">
    <FireWork v-model:showWord="showW" />

  </div>
  <div class="container2" v-if="!showW">
    <div class="cccontainer">

      <div class="card">
        <div class="title">Ta送你了一张电子贺卡</div>
        <div class="p_1">
          <div class="t_1">To:</div>
          <div class="p_2">
            <img class="img_1" :src="avatar" alt="">
            <div class="p_3">
              <div class="name">{{ name }}</div>
              <div class="detail">{{ detail }}</div>
            </div>
          </div>
        </div>
        <div style="height: 10px;">
        </div>
        <div class="p_1">
          <div class="t_1">From:</div>
          <div class="name">{{ from }}</div>
        </div>
        <button class="but_1" @click="change">
          <img src="../static/right.svg" alt="" class="img_2">
        </button>
      </div>
      <div class="card_2">
        <el-button type="primary" @click="makecard" link size="large">做同款 →</el-button>
      </div>
    </div>
  </div>
  <div class="container3" v-if="showW">
    <div class="word">
      <Typed v-if="showW"
             :typedList="['亲爱的靳取小哥哥，', '在这个金秋十月，祖国迎来了她的生日，大街小巷都洋溢着节日的气氛。值此国庆佳节之际，我想向你送上最真挚的祝福。愿这个假期能带给你无限的喜悦与放松，让你有足够的时间去享受生活中的美好时刻。', '希望在这段悠长的假期里，你可以有机会探索新的风景，体验不一样的风情，也可以和家人朋友共度温馨时光。无论你是选择出行游玩还是在家休憩，都希望每一天都能充满快乐与惊喜。', '祝你国庆假期愉快，收获满满！', '最好的祝愿，', '倪镭']"
             class="type" />
    </div>
  </div>

</template>

<script>
import FireWork from '../components/FireworkType.vue'
import Typed from '../components/typed.vue'
export default {
  data() {
    return {
      showW: false,
      name: '靳取',
      detail: '最帅最高最厉害的小哥哥',
      from: 'Yutian',
      // avatar: "https://mypan.huorong.eu.org/raw/health/11.jpg",
      avatar: "https://mypan.huorong.eu.org/raw/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20241006205637.jpg",
    }
  },
  methods: {
    makecard() {
      this.$router.push({ name: 'makeCard' })
    },
    change() {
      this.showW = !this.showW
      console.log(this.showW)
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
.container {
  width: 100%;
  height: 100vh;
}

body {
  background-color: #000000;
}

.type {
  z-index: 600;
  position: absolute;
}

.word {
  width: 70%;
  margin-left: 10%;
  margin-top: 5%;
}

.container2 {
  position: absolute;
  z-index: 601;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center; /* 控制子元素在容器内的垂直对齐 */
}
.cccontainer{
  flex-wrap: wrap; /* 允许子元素换行 */
  gap: 10px; /* 子元素之间的间距 */
}
.container3 {
  position: absolute;
  z-index: 602;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: left;
}

.card_2 {
  width: 420px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: left;
}

.card {
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

.title {
  width: 100%;
  line-height: 30px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}

.t_1 {
  line-height: 60px;
  font-size: 23px;
  font-weight: 600;
  color: #467dbf;
}

.p_1 {
  width: 85%;
}

.p_2 {
  display: flex;
  height: 70px;
}

.img_1 {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-right: 20px;
}

.p_3 {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.name {
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
}

.detail {
  font-size: 16px;
  color: #999999;
  line-height: 26px;
}

.img_2 {
  width: 35px;
  height: 35px;
}

.but_1 {
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

.but_1:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

</style>