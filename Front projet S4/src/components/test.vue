<script setup>
import { ref } from "vue";

const count = ref(4);
// userStore.init();
</script>

<template>
    <button @click = "count++">{{count}}</button>
</template>