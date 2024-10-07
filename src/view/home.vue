<script>
import FireWork from '@/components/FireworkType.vue'
import Typed from '@/components/typed.vue'

export default {
  data() {
    return {
    }
  },
  methods: {
    makecard() {
      this.$router.push({ name: 'makeCard' });
    },
    card() {
      this.$router.push({ name: 'card' });
    }
  },
  mounted() {

  },
}
</script>

<template>
  <el-button type="primary" @click="card">card</el-button>
  <el-button type="primary" @click="makecard">makecard</el-button>
</template>

<style>

</style>