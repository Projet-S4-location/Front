<script setup>
    const props = defineProps(["name", "tags", "prix", "image"])
</script>

<template>
    <div class="container">
        <h1>{{props.name}}</h1>
        <a v-for="tag in props.tags">{{ tag }}</a>
        <h2>{{props.prix}}€/jour</h2>
        <img :src = "props.image">
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

    /* Container styling */
    .container {
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        margin: 10px;
        width: 200px;
        display: inline-block;
        vertical-align: top;
    }

    /* Title styling */
    h1 {
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: "Inter", sans-serif; 
         font-weight: 800;
         padding-bottom: 2%;
        font-size: 1.2rem;
        margin-bottom: 5px;
    }

    /* Tag styling */
    a {
        display: inline-block;
        background-color: #f0f0f0;
        color: #333;
        padding: 3px 8px;
        border-radius: 3px;
        margin-right: 5px;
        margin-bottom: 5px;
        text-decoration: none;
    }

    /* Price styling */
    h2 {
        font-size: 16px;
        color: #007bff;
        margin: 10px 0;
    }

    /* Image styling */
    img {
        width: 100%;
        border-radius: 5px;
    }
</style>
