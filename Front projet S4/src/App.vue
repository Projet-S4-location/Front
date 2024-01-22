<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from "vue-router";
const router = useRouter();
router.push("/connexion")
</script>

<template>
  <router-link :to="{ name: 'test'}">routeur vers test</router-link>
  <RouterView/>

</template>


<style scoped>
</style>
