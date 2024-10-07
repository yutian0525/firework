<script>

</script>

<template>
  <div class="container2">
    <div class="card">

    </div>

  </div>
</template>

<style>
.card{
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
</style>