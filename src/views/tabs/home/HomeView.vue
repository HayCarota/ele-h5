<script setup lang="ts">
import TheTop from './components/TheTop.vue'

const recomments = [
  { value: 1, label: '牛腩' },
  { value: 2, label: '红烧肉' },
  { value: 3, label: '宫保鸡丁' }
]
</script>

<template>
  <div class="home-page">
    <TheTop :recomments="recomments" />
  </div>
</template>

<style>
.test {
  font-size: 39px;
}
</style>
