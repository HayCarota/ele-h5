<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
// import TabsView from './views/tabs/TabsView.vue';

import { fetchTest } from '@/api/test'

fetchTest()

</script>

<template>
    <RouterView />
    <!-- <TabsView></TabsView> -->
</template>

<style scoped>

</style>
