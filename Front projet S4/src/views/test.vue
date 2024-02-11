<script setup>
    import test from '../components/test.vue' 
    import navbar from '../components/header.vue'
    import { useUserStore } from './../stores/user';

    const user = useUserStore();
    console.log(user.username)
</script>


<template>
    <navbar></navbar>
</template>