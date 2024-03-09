<script setup>
    import { ref } from "vue";
    import { useUserStore } from "./../stores/user";
    import { useRoute } from 'vue-router'

    const userStore = useUserStore();
    const loc = ref("louer_app")
</script>

<template>
    <header>
        <div class="img_containt">
        <img
              id="logo"
              src="/images/logo/feuille.png"
              alt="logo de l'entreprise"
            />   
            <img
              id="ligne"
              src="/images/logo/ligne.png"
              alt="logo de l'entreprise"
            />  
            <img
              id="nom"
              src="/images/logo/nom.png"
              alt="logo de l'entreprise"
            />   
        </div>
        <nav>
            <router-link :to="{ name: 'item_shop'}">Louer un appareil</router-link>        
            <router-link :to="{ name: 'studio_shop'}">Louer un studio</router-link>        
            <a @click = "loc = 'profil'" :class="{selected :loc=='profil'}">Mon compte</a>
            <router-link v-if="userStore.isAdmin" :to="{ name: 'admin'}">Page Admin</router-link>        
        </nav>
    </header>
</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap');


header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #F6EAD8;
    padding: 10px;
    padding-left: 2%;
    padding-right: 2%;
    border-radius: 0% 0% 5% 5%;}

.img_containt {
    align-items: center;
    justify-content: space-between;
    display: flex;
}

#logo {
    width: 80px;
    height: 20px;
    padding-right: 15px;
}
#ligne {
 height: 30px;
 width: 3px;
 padding-right: 15px;

}
#nom {
    width: 150px;
    height: 10px;

}

nav{
    display:flex;
    column-gap: 20px;
}

a{
    font: 0.9rem "Roboto Slab", medium;
    text-decoration: underline ;
    
}

h1{
    font: 0.9rem "Roboto Slab", medium;

}
a, h1{
    color:rgb(2, 2, 2);
    transition: 1s ease-in-out;
}

h1:hover, a:hover{
  color: rgb(2, 2, 2);
}

</style>