<script setup>
import { ref } from "vue";
import { useUserStore } from '../stores/user';

const userStore = useUserStore()
const user = userStore.init()

</script>
<template>
    <h1> Page admin </h1>
</template>

<!-- NE PAS METTRE EN SCOPED -->
<style scoped>

</style>