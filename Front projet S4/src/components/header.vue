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
              src="/images/logo/chrome2.png"
              alt="logo de l'entreprise"
            /> 
            <!-- 
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
            />  --> 
        </div> 
        
        <nav>
            <ul>
              <router-link :to="{ name: 'item_shop'}">Louer un appareil</router-link>        
            <router-link :to="{ name: 'studio_shop'}">Louer un studio</router-link>        
            <a @click = "loc = 'profil'" :class="{selected :loc=='profil'}">Mon compte</a>
            <router-link v-if="userStore.isAdmin" :to="{ name: 'admin'}">Page Admin</router-link>              
             </ul>
        </nav>
    </header>
</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap');


header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #131215;
    padding: 10px;
}

.img_containt {
    align-items: center;
    justify-content: space-between;
    display: flex;
}

#logo {
    width: 90px;
    height: 70px;
}

/* #ligne {
 height: 30px;
 width: 3px;
 padding-right: 15px;

}
#nom {
    width: 150px;
    height: 10px;

} */
ul { 
  padding: 0; 
  list-style: none; 
  display: table;
  width: 700px;
  text-align: center;
}
li { 
  display: table-cell; 
  position: relative; 
  padding: 15px 0;
}
a {
  color: #fff;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 0.15em;
  font-size: 0.7rem; 
  display: inline-block;
  padding: 15px 20px;
  position: relative;
}

a:after {  
  background: none repeat scroll 0 0 transparent;
  bottom: 0;
  content: "";
  display: block;
  height: 2px;
  left: 50%;
  position: absolute;
  background: #fff;
  transition: 0.3s;
  width: 0;
}
a:hover:after { 
  width: 100%; 
  left: 0; 
}

/* .selected:after { 
  width: 100%; 
  left: 0; 
} */

/* nav{
    display:flex;
    column-gap: 20px;
}

a{
    font: 0.9rem "Roboto Slab", medium;
    text-decoration: none;
    transition: color 0.3s ease; 
}

a:hover {
    text-decoration: blue;
}

h1{
    font: 0.9rem "Roboto Slab", medium;

}
a, h1{
    color:rgb(255, 255, 255);
    transition: 1s ease-in-out;
}

h1:hover, a:hover{
  color: rgb(255, 255, 255);
} */

</style>