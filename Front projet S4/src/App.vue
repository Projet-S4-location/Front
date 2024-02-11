<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
  <router-link :to="{ name: 'test'}">routeur vers test</router-link>
  <router-link :to="{ name: 'connexionV2'}">routeur vers connexion</router-link>
  <RouterView/>

</template>


<style scoped>
</style>
