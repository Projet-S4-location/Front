<script setup>
    import { ref } from "vue";
    import { useUserStore } from "./../stores/user";
    import { useRoute } from 'vue-router'

    const userStore = useUserStore();
    const loc = ref("louer_app")
</script>

<template>
    <header>
        <h1>Sofian Photographie</h1>
        <nav>
            <a @click = "loc = 'louer_app'" :class="{selected :loc=='louer_app'}">Louer un appareil</a>
            <a @click = "loc = 'louer_stud'" :class="{selected :loc=='louer_stud'}">Louer un studio</a>
            <a @click = "loc = 'profil'" :class="{selected :loc=='profil'}">Mon compte</a>
            <router-link v-if="userStore.isAdmin" :to="{ name: 'admin'}">Page Admin</router-link>        
        </nav>
    </header>
</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');



header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #373737;
    padding: 10px;
    padding-left: 2%;
    padding-right: 2%;
    border-radius: 0% 0% 5% 5%;}

nav{
    display:flex;
    column-gap: 20px;
}

a{
    font: 1rem "Fira Sans", Playfair Display;
    text-decoration: none;
}

h1{
    font: 2rem "Fira Sans", Playfair Display;

}
a, h1{
    color:#F49141;
    transition: 1s ease-in-out;
}

h1:hover, a:hover{
  color: rgb(2, 2, 2);
}

</style>