<template>
  <!-- 氛围组：烟花 https://github.com/Doener48/firework -->
  <!-- <typerwriter :texts="['第一行测试','第二行测试','第3行测试','第4行测试']"/> -->

  <div class="message" v-if="showFirework"
       :style="{
        top:windowHeight - 144 +'px'
    }">
<!--    <p style="color: #ffffff;">word{{showWordRef}}</p>-->
  </div>
  <!-- <button @click="startcanvas.test">112</button> -->
  <canvas id="mainCanvas"></canvas>
  <canvas id="letterCanvas" style="display: none"></canvas>
  <!--
      <div class="filter" v-if="!clickstate" @click="clickbtn">
          <div class="btn">许愿</div>
      </div> -->
</template>
<script lang="ts" setup>
let props = defineProps<{
  showWord: boolean;
}>();

import { onMounted, watch, ref, computed } from 'vue'

// 将 prop 转换为 ref
const showWordRef = ref(props.showWord);

watch(
  () => props.showWord,
  (newVal) => {
    showWordRef.value = newVal;
  }
);
const showFirework = ref(true), //是否显示侧栏烟花特效
  fireworkTitle = ref('🧨烟花许愿🧨｜②⓪②⑤新年'), //烟花许愿标题
  fireworkWords = ref(['恭贺新禧', '万事如意', '新年快乐', '恭喜发财', '岁岁平安', '吉祥如意', '心想事成', '万事顺遂', '一帆风顺', '二龙腾飞', '三羊开泰', '四季平安', '五福临门', '六六大顺', '七星高照', '八方来财', '九九同心', '十全十美', '荣华富贵', '金玉满堂', '龙凤呈祥', '喜气洋洋', '鸿运当头', '财源广进', '笑口常开', '幸福安康', '日进斗金', '生意兴隆', '步步高升', '年年有余', '迎春接福', '喜气盈门', '花团锦簇', '前程似锦', '福满人间', '春回大地', '辞旧迎新', '万象更新', '吉祥如意', '万事大吉', '马到成功', '功成名就', '鱼跃龙门', '一飞冲天', '瑞气盈门', '福寿康宁', '时来运转', '鸿运高照', '三阳开泰', '否极泰来', '鸿运亨通', '一帆风顺', '出入平安', '顺风顺水', '龙凤呈祥', '花好月圆', '张灯结彩', '欢天喜地', '合家欢乐', '幸福美满', '和气致祥', '招财进宝', '开门大吉', '迎春接福', '福泽满门', '花开富贵', '竹报平安', '大吉大利', '恭喜发财']) //烟花许愿关键词

const getRandomInt = (max: number) =>
  Math.floor(Math.random() * Math.floor(max))
const newyearwordslist = fireworkWords.value
const newyearwords = ref(newyearwordslist[getRandomInt(newyearwordslist.length)])
const backvoice = ref(false)
const backvoice2 = computed(() => backvoice.value)
const clickstate = ref(true)

const windowHeight = ref(window.innerHeight)
const clickbtn = () => {
  clickstate.value = true
}

const changebackvoice = () => {
  if (backvoice2.value) {
    backvoice.value = false
    soundManager.pauseAll()

  } else {
    backvoice.value = true
    soundManager.resumeAll()
  }

  console.log(backvoice.value)
}

const MyMath = (function MyMathFactory(Math) {

  const MyMath = {}


  // degree/radian conversion constants
  MyMath.toDeg = 180 / Math.PI
  MyMath.toRad = Math.PI / 180
  MyMath.halfPI = Math.PI / 2
  MyMath.twoPI = Math.PI * 2

  // Pythagorean Theorem distance calculation
  MyMath.dist = (width, height) => {
    return Math.sqrt(width * width + height * height)
  }

  // Pythagorean Theorem point distance calculation
  // Same as above, but takes coordinates instead of dimensions.
  // The language of this project was translated into Chinese by Nianbroken
  MyMath.pointDist = (x1, y1, x2, y2) => {
    const distX = x2 - x1
    const distY = y2 - y1
    return Math.sqrt(distX * distX + distY * distY)
  }

  // Returns the angle (in radians) of a 2D vector
  MyMath.angle = (width, height) => (MyMath.halfPI + Math.atan2(height, width))

  // Returns the angle (in radians) between two points
  // Same as above, but takes coordinates instead of dimensions.
  MyMath.pointAngle = (x1, y1, x2, y2) => (MyMath.halfPI + Math.atan2(y2 - y1, x2 - x1))

  // Splits a speed vector into x and y components (angle needs to be in radians)
  MyMath.splitVector = (speed, angle) => ({
    x: Math.sin(angle) * speed,
    y: -Math.cos(angle) * speed
  })

  // Generates a random number between min (inclusive) and max (exclusive)
  MyMath.random = (min, max) => Math.random() * (max - min) + min

  // Generates a random integer between and possibly including min and max values
  MyMath.randomInt = (min, max) => ((Math.random() * (max - min + 1)) | 0) + min

  // Returns a random element from an array, or simply the set of provided arguments when called
  MyMath.randomChoice = function randomChoice(choices) {
    if (arguments.length === 1 && Array.isArray(choices)) {
      return choices[(Math.random() * choices.length) | 0]
    }
    return arguments[(Math.random() * arguments.length) | 0]
  }

  // Clamps a number between min and max values
  MyMath.clamp = function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max)
  }


  return MyMath

})(Math)

const soundManager = {
  baseURL: '',
  ctx: new (window.AudioContext || window.webkitAudioContext),
  sources: {
    lift: {
      volume: 1,
      playbackRateMin: 0.85,
      playbackRateMax: 0.95,
      fileNames: [
        'https://res.wx.qq.com/voice/getvoice?mediaid=MzUzMDUzMjQyMl8xMDAwMDE4NTk=', //lift1.mp3
        'https://res.wx.qq.com/voice/getvoice?mediaid=MzUzMDUzMjQyMl8xMDAwMDE4NjA=', //lift2.mp3
        'https://res.wx.qq.com/voice/getvoice?mediaid=MzUzMDUzMjQyMl8xMDAwMDE4NjE='  //lift3.mp3
      ]
    },
    burst: {
      volume: 1,
      playbackRateMin: 0.8,
      playbackRateMax: 0.9,
      fileNames: [
        'https://res.wx.qq.com/voice/getvoice?mediaid=MzUzMDUzMjQyMl8xMDAwMDE4NTU=', //burst1.mp3
        'https://res.wx.qq.com/voice/getvoice?mediaid=MzUzMDUzMjQyMl8xMDAwMDE4NTY=' //burst2.mp3
      ]
    },
    burstSmall: {
      volume: 0.25,
      playbackRateMin: 0.8,
      playbackRateMax: 1,
      fileNames: [
        'https://res.wx.qq.com/voice/getvoice?mediaid=MzUzMDUzMjQyMl8xMDAwMDE4NTM=', //burst-sm-1.mp3
        'https://res.wx.qq.com/voice/getvoice?mediaid=MzUzMDUzMjQyMl8xMDAwMDE4NTQ=' //burst-sm-2.mp3
      ]
    },
    crackle: {
      volume: 0.2,
      playbackRateMin: 1,
      playbackRateMax: 1,
      fileNames: ['https://res.wx.qq.com/voice/getvoice?mediaid=MzUzMDUzMjQyMl8xMDAwMDE4NTg='] //crackle1.mp3
    },
    crackleSmall: {
      volume: 0.3,
      playbackRateMin: 1,
      playbackRateMax: 1,
      fileNames: ['https://res.wx.qq.com/voice/getvoice?mediaid=MzUzMDUzMjQyMl8xMDAwMDE4NTc='] //crackle-sm-1.mp3
    }
  },

  preload() {
    const allFilePromises = []

    function checkStatus(response) {
      if (response.status >= 200 && response.status < 300) {
        return response
      }
      const customError = new Error(response.statusText)
      customError.response = response
      throw customError
    }

    const types = Object.keys(this.sources)
    types.forEach(type => {
      const source = this.sources[type]
      const { fileNames } = source
      const filePromises = []
      fileNames.forEach(fileName => {
        const fileURL = this.baseURL + fileName
        // Promise will resolve with decoded audio buffer.
        const promise = fetch(fileURL)
          .then(checkStatus)
          .then(response => response.arrayBuffer())
          .then(data => new Promise(resolve => {
            this.ctx.decodeAudioData(data, resolve)
          }))

        filePromises.push(promise)
        allFilePromises.push(promise)
      })

      Promise.all(filePromises)
        .then(buffers => {
          source.buffers = buffers
        })
    })

    return Promise.all(allFilePromises)
  },

  pauseAll() {
    this.ctx.suspend()
  },

  resumeAll() {
    // Play a sound with no volume for iOS. This 'unlocks' the audio context when the user first enables sound.
    this.playSound('lift', 0)
    // Chrome mobile requires interaction before starting audio context.
    // The sound toggle button is triggered on 'touchstart', which doesn't seem to count as a full
    // interaction to Chrome. I guess it needs a click? At any rate if the first thing the user does
    // is enable audio, it doesn't work. Using a setTimeout allows the first interaction to be registered.
    // Perhaps a better solution is to track whether the user has interacted, and if not but they try enabling
    // sound, show a tooltip that they should tap again to enable sound.
    setTimeout(() => {
      this.ctx.resume()
    }, 250)
  },

  // Private property used to throttle small burst sounds.
  _lastSmallBurstTime: 0,

  /**
   * Play a sound of `type`. Will randomly pick a file associated with type, and play it at the specified volume
   * and play speed, with a bit of random variance in play speed. This is all based on `sources` config.
   *
   * @param  {string} type - The type of sound to play.
   * @param  {?number} scale=1 - Value between 0 and 1 (values outside range will be clamped). Scales less than one
   *                             descrease volume and increase playback speed. This is because large explosions are
   *                             louder, deeper, and reverberate longer than small explosions.
   *                             Note that a scale of 0 will mute the sound.
   */
  playSound(type, scale = 1) {
    // Ensure `scale` is within valid range.
    scale = MyMath.clamp(scale, 0, 1)

    // Disallow starting new sounds if sound is disabled, app is running in slow motion, or paused.
    // Slow motion check has some wiggle room in case user doesn't finish dragging the speed bar
    // *all* the way back.
    // if (!canPlaySoundSelector() || simSpeed < 0.95) {
    // 	return;
    // }

    // Throttle small bursts, since floral/falling leaves shells have a lot of them.
    if (type === 'burstSmall') {
      const now = Date.now()
      if (now - this._lastSmallBurstTime < 20) {
        return
      }
      this._lastSmallBurstTime = now
    }

    const source = this.sources[type]

    if (!source) {
      throw new Error(`Sound of type "${type}" doesn't exist.`)
    }

    const initialVolume = source.volume
    const initialPlaybackRate = MyMath.random(
      source.playbackRateMin,
      source.playbackRateMax
    )

    // Volume descreases with scale.
    const scaledVolume = initialVolume * scale
    // Playback rate increases with scale. For this, we map the scale of 0-1 to a scale of 2-1.
    // So at a scale of 1, sound plays normally, but as scale approaches 0 speed approaches double.
    const scaledPlaybackRate = initialPlaybackRate * (2 - scale)

    const gainNode = this.ctx.createGain()
    gainNode.gain.value = scaledVolume

    const buffer = MyMath.randomChoice(source.buffers)
    const bufferSource = this.ctx.createBufferSource()
    bufferSource.playbackRate.value = scaledPlaybackRate
    bufferSource.buffer = buffer
    bufferSource.connect(gainNode)
    gainNode.connect(this.ctx.destination)
    bufferSource.start(0)
  }
}

const startcanvas = () => {
  interface Color {
    r: number;
    g: number;
    b: number;
    a: number;
  }

  class Vector {
    x: number
    y: number

    constructor(x: number = 0, y: number = 0) {
      this.x = x
      this.y = y
    }

    add(s: Vector) {
      this.x += s.x
      this.y += s.y
    }

    sub(s: Vector) {
      this.x -= s.x
      this.y -= s.y
    }

    scale(m: number) {
      this.x *= m
      this.y *= m
    }

    div(m: number) {
      this.x /= m
      this.y /= m
    }

    norm() {
      const m = Math.sqrt(this.x * this.x + this.y * this.y)
      this.x /= m
      this.y /= m
    }
  }


  let generalSettings = { bgAlpha: 1 }
  let rocketSettings = { size: 3.2, spawnRate: 1.6 } //控制发射时的大小、数量
  let explosionSettings = { size: 3.2, fadeSpeed: 1.8, applyGravity: true } //控制爆炸后的高斯模糊、大小、重力效果
  let wordSettings = { particleSize: 1.8, fadeSpeed: 0.2 }
  let canvaswidth = (window.innerWidth)

  const canvas: any = document.getElementById('mainCanvas')
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d')
  // window.addEventListener("resize", init, false);

  const textCanvas: any = document.getElementById('letterCanvas')
  const textCtx: CanvasRenderingContext2D = textCanvas.getContext('2d')


  const textInput: HTMLInputElement = document.getElementById(
    'messageInput'
  ) as HTMLInputElement


  let bgcolor = ref({})

  const gravity = new Vector(0, 0.05)
  const fireworks: Firework[] = []

  // if (isDark.value) {
  bgcolor.value = { r: 22, g: 22, b: 24, a: 1 }
  // } else {
  //     bgcolor.value = { r: 246, g: 246, b: 246, a: 1 };
  // }

  let letterImageData

  function init() {
    canvas.width = canvaswidth
    canvas.height = window.innerHeight
    ctx.fillStyle = 'transparent'
    ctx.fill()

    textCanvas.style.background = 'white'
    textCanvas.width = canvaswidth
    textCanvas.height = 150
    // fireworks.push(new Firework("2024"));
    // if (isDark.value) {
    bgcolor.value = { r: 22, g: 22, b: 24, a: 1 }
    fireworks.push(new Firework())
    // } else {
    //     bgcolor.value = { r: 246, g: 246, b: 246, a: 1 };
    //     fireworks.push(new Firework())
    // }
  }

  function generateTextParticles(text: string, offset: Vector, color: Color) {
    textCtx.fillStyle = 'black'
    textCtx.font = '12px Verdana'
    textCtx.clearRect(0, 0, canvaswidth, 150)
    textCtx.fillText(text, 0, 30)
    letterImageData = textCtx.getImageData(0, 0, canvaswidth, 100)
    const letterParticles = []
    for (let y = 0, y2 = letterImageData.height; y < y2; y++) {
      for (let x = 0, x2 = letterImageData.width; x < x2; x++) {
        if (
          letterImageData.data[y * 4 * letterImageData.width + x * 4 + 3] > 128
        ) {
          const ptemp = new Particle(
            new Vector(),
            new Vector(),
            new Vector(),
            wordSettings.particleSize,
            color,
            new Vector(
              x * 3 + offset.x - text.length * 18,
              y * 3 + offset.y - 100
            )
          )
          ptemp.pos = new Vector(offset.x, offset.y)
          letterParticles.push(ptemp)
        }
      }
    }
    return letterParticles
  }

  function animate() {
    requestAnimationFrame(animate)
    ctx.rect(0, 0, canvaswidth, window.innerHeight)
    ctx.fillStyle = `rgba(${bgcolor.value?.r},${bgcolor.value?.g},${bgcolor.value?.b},1)`
    ctx.fill()
    if (Math.random() <= rocketSettings.spawnRate / 100) {
      soundManager.playSound('burstSmall')
      if(getRandomInt(10)>7 && showWordRef.value){
        fireworks.push(new Firework(fireworkWords.value[getRandomInt(20)]))
      }
      else{
        fireworks.push(new Firework())
      }

    }
    for (let i = fireworks.length - 1; i >= 0; i--) {
      fireworks[i].update()
      fireworks[i].draw()
      if (fireworks[i].exploded && fireworks[i].particles.length == 0) {
        fireworks.splice(i, 1)
      }
    }
  }

  class Particle {
    pos: Vector
    vel: Vector
    acc: Vector
    size: number
    color: Color
    homePos: Vector

    constructor(
      pos: Vector = new Vector(
        canvaswidth / 2 + ((Math.random() - 0.5) * canvaswidth) / 6,
        window.innerHeight
      ),
      vel: Vector = new Vector((Math.random() - 0.5) * 1, Math.random() * -2 - 6),
      acc: Vector = new Vector(),
      size: number = rocketSettings.size,
      color = {
        r: Math.random() * 255,
        g: Math.random() * 255,
        b: Math.random() * 255,
        a: 1
      },
      homePos: Vector = pos
    ) {
      this.pos = pos
      this.vel = vel
      this.acc = acc
      this.size = size
      this.color = color
      this.homePos = homePos

      this.draw()
    }

    draw() {
      ctx.beginPath()
      ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2, false)
      ctx.fillStyle = `rgba(${this.color.r},${this.color.g},${this.color.b},${this.color.a})`
      ctx.fill()
    }

    update() {
      this.vel.add(this.acc)
      this.pos.add(this.vel)
      this.acc.scale(0)


    }

    fade(x: number) {
      if (this.color.a > 0) {
        this.color.a -= 0.0001 * x
      }
    }

    applyForce(force: Vector) {

      this.acc.add(force)
    }

    steerToHome() {
      const dvec = new Vector(
        this.homePos.x - this.pos.x,
        this.homePos.y - this.pos.y
      )
      const distanceFromHome = Math.sqrt(dvec.x * dvec.x + dvec.y * dvec.y)
      if (distanceFromHome > 0) {

        dvec.norm()
        dvec.scale(Math.random() * 4)
        this.vel = dvec
      }
    }
  }

  class Firework {
    rocket: Particle
    particles: Particle[]
    exploded: boolean
    text: string

    constructor(text?: string) {
      this.particles = []
      this.exploded = false
      this.rocket = new Particle()
      this.text = text
    }

    update() {

      if (!this.exploded) {

        this.rocket.applyForce(gravity)
        this.rocket.update()
        if (this.rocket.vel.y > 0) {
          this.explode()
        }
      } else {
        for (let i = this.particles.length - 1; i >= 0; i--) {

          let fader = explosionSettings.fadeSpeed
          if (this.text) {
            fader = (1 - this.text.length / 50) / 2 * wordSettings.fadeSpeed
            this.particles[i].steerToHome()
          }
          if (explosionSettings.applyGravity) {
            this.particles[i].applyForce(gravity)
          }
          this.particles[i].update()
          this.particles[i].fade(fader)
          if (this.particles[i].color.a <= 0) {
            this.particles.splice(i, 1)
          }
        }
      }
    }

    draw() {
      if (!this.exploded) {
        this.rocket.draw()
      } else {
        for (let i = 0; i < this.particles.length; i++) {
          this.particles[i].draw()
        }
      }
    }

    explode() {
      this.exploded = true

      if (this.text) {
        const letter = generateTextParticles(
          this.text,
          new Vector(this.rocket.pos.x, this.rocket.pos.y),
          this.rocket.color
        )
        this.particles = letter
      } else {
        for (let i = 0; i < 50; i++) {
          const vx = (Math.random() - 0.5) * 7
          const vy = (Math.random() - 0.5) * 7
          this.particles.push(
            new Particle(
              new Vector(this.rocket.pos.x, this.rocket.pos.y),
              new Vector(vx, vy),
              new Vector(),
              explosionSettings.size,
              this.rocket.color
            )
          )
        }
      }
      const soundx = ['burst', 'lift']
      soundManager.playSound(soundx[getRandomInt(soundx.length)])
    }
  }

  init()
  animate()
}

// watch(
//     isDark,
//     (val) => {
//         startcanvas()
//     }
// )
onMounted(() => {
  if (showFirework.value) {
    soundManager.preload()
    startcanvas()
  }
})

</script>
<style scoped>
.filter {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 500;
  background-color: rgba(0, 0, 0, .05);
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .btn {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);
    color: #ffffff;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

#mainCanvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.message {
  position: sticky;
  z-index: 100;
  bottom: 0px;
  margin-top: 40px;
  margin-bottom: -40px;
  bottom: 0px;
  width: 100%;
  height: 40px;

  /* margin-bottom: 2rem; */

  .span {
    position: absolute;
    bottom: 100%;
    font-size: 12px;
    opacity: .8;
    width: 100%;
    text-align: center;

    .a {
      color: var(--vp-c-brand);
    }
  }
}

.msgwrap {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
}

.messageleft {
  position: relative;
  overflow: hidden;
  background-color: var(--color-background);
  border-radius: 0.25rem;

  .voicectl {
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    width: 30px;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    opacity: .4;
    transition: .3s;

    .svg {
      width: 14px;
      height: 14px;
    }
  }

  .voicectl:hover {
    opacity: 1;
  }
}

#messageInput {
  background-color: var(--color-background);
  padding: 0.5rem;
  border: none;
  height: 40px;
  color: var(--vt-c-text-light-2);
}

.button {
  background-color: var(--color-background);
  padding: 0.5rem;
  border-radius: 0.25rem;
  box-shadow: 0 2px #00000004;
  animation: jump 0s;

  margin-left: 8px;
  border: none;
  height: 40px;
  background: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);
  color: #ffffff;
}

.button:hover {
  animation-duration: 1s;
}

.button:active {
  animation: none;
}

@keyframes jump {
  from {
    transform: scale3d(1, 1, 1)
  }

  10%,
  20% {
    transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)
  }

  30%,
  50%,
  70%,
  90% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)
  }

  40%,
  60%,
  80% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)
  }

  to {
    transform: scale3d(1, 1, 1)
  }
}
</style>
