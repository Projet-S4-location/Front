<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <router-link :to="{ name: 'test'}">routeur vers test</router-link>
  <RouterView/>

</template>

<style scoped>
</style>
