<script setup>
    import { ref } from "vue";
    const loc = ref("louer_app")
</script>

<template>
    <header>
        <h1>Sofian Photographie</h1>
        <nav>
            <a href="" @click = "loc.value = 'louer_app'" :class="{selected :loc.value=='louer_app'}">Louer un appareil</a>
            <a href="" @click = "loc.value = 'louer_stud'" :class="loc.value=='louer_stud'">Louer un studio</a>
            <a href="" @click = "loc.value = 'profil'" :class="loc.value=='profil'">Profil</a>
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
    color:#F6A395;
    display:flex;
    flex-direction: row;
    column-gap: 20px;
}

.selected{
    color:#F49141;
}

a{
    text-decoration: none;
    color: inherit;
}

a:hover{
    color:#F49141;
}

</style>