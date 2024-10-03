<template>
    <div class="place">
      <div class="typedText_ magin" v-for="item in typedTextList">{{ item }}</div>
      <div class="typedText magin">{{ typedText }}</div>
    </div>
  </template>
  
  <script>
  export default {
    name: "typed",
    props: {
      typedList: [],
      loop: {
        type: Boolean,
        default: false,
      },
      speed: {
        type: Number,
        default: 150,
      },
    },
    data() {
      return {
        typedText: "",
        typedTextList: []
      };
    },
    mounted() {
      this.start();
    },
    methods: {
      start() {
        this.typedTextList=[];
        let j = 0;
        let k = 0;
        this.typedText = "";
        if (this.typedList.length <= 0) {
          console.error("typedList数据缺失");
          return;
        }
        let arr = this.typedList[k].split("");
        let timer = setInterval(() => {
          if (j < arr.length) {
            this.typedText += arr[j++];
          } else {
            if (k < this.typedList.length - 1) {
              this.typedTextList.push(this.typedText)
              k++;
              j = 0;
              this.typedText = "";
              arr = this.typedList[k].split("");
            } else {
              clearInterval(timer);
              if (this.loop) {
                this.start();
              }
            }
          }
        }, this.speed);
      },
    },
  };
  </script>
  <style lang="scss" scoped>
  .typedText::after {
    content: "|";
    animation: blink 1s infinite;
  }
  .typedText{
    color:rgb(255, 255, 255);
    font-size: 18px;
    word-wrap: break-word;
  }
  .typedText_{
    color:rgb(255, 255, 255);
    font-size: 18px;
    word-wrap: break-word;
  }
  .place{
    width: 500px;
  }
  .magin{
    margin-top: 7px;
    margin-bottom: 7px;
  }
  @keyframes blink {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  </style>
  