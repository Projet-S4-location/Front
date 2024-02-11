<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from "vue-router";
import { useUserStore } from './stores/user';
const router = useRouter();
const user = useUserStore();
</script>

<template>
  <h1>{{ user.username }}</h1>
  <router-link :to="{ name: 'test'}">routeur vers test</router-link>
  <router-link :to="{ name: 'connexionV2'}">routeur vers connexion</router-link>
  <RouterView/>

</template>


<style scoped>
</style>
