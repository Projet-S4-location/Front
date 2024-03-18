<script setup>
    import test from '../components/test.vue' 
    import navbar from '../components/header.vue'   
    import { useUserStore } from "./../stores/user";


    const userStore = useUserStore();
    console.log(userStore.username)
</script>


<template>
    <navbar></navbar>
    <h1>Merci d'avoir réservé :)</h1>
</template>