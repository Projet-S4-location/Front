<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from "vue-router";
import { useUserStore } from './stores/user';
import { onBeforeMount } from 'vue';
const router = useRouter();
const user = useUserStore();
onBeforeMount(() => {
  user.init(); // Initialiser le magasin d'utilisateur lors du chargement de l'application
  if (!user.isLoggedIn){
  router.push("connexion")
}
});



</script>
<template>
  <RouterView/>

</template>


<style scoped>
</style>
