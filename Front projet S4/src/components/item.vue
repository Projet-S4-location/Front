<script setup>
    const props = defineProps(["name", "tags", "prix", "image"])
</script>

<template>
    <div>
        <h1>{{props.name}}</h1>
        <a v-for="tag in props.tags">{{ tag }}</a>
        <h2>{{props.prix}}€/jour</h2>
        <img :src = "props.image">
    </div>
</template>