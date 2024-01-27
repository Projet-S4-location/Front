<script setup>
    import { ref } from "vue";
    const loc = ref("louer_app")
</script>

<template>
    <header>
        <h1>Sofian Photographie</h1>
        <nav>
            <a @click = "loc = 'louer_app'" :class="{selected :loc=='louer_app'}">Louer un appareil</a>
            <a @click = "loc = 'louer_stud'" :class="{selected :loc=='louer_stud'}">Louer un studio</a>
            <a @click = "loc = 'profil'" :class="{selected :loc=='profil'}">Mon compte</a>
        </nav>
    </header>
</template>

<style>
body{
    padding:0;
    margin:0;
    font-family: "Space Grotesk", sans-serif;
    font-optical-sizing: auto;
    font-weight: 100;
    font-style: normal;
}

header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f2f2f2;
    color: #F49141;
    padding: 40px;
}

nav{
    color:#F49141;
    display:flex;
    flex-direction: row;
    column-gap: 20px;
}

.selected{
    color:#F6A395;
}

a{
    text-decoration: none;
    color: inherit;
}

a:hover{
    color:#F49141;
}

</style>