<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from "vue-router";
import { useUserStore } from './stores/user';

const router = useRouter();
const user = useUserStore();
console.log(user.username)
if (!user.isLoggedIn){
  router.push("connexion")
}

</script>

<template>
  <RouterView/>

</template>


<style scoped>
</style>
