<script setup>
import { ref } from "vue";
import { useUserStore } from '../stores/user';

import productAdmin from '../components/productAdmin.vue'
import userAdmin from '../components/userAdmin.vue'


const userStore = useUserStore()
// userStore.init()

const states = ref({
    user: "utilisateur",
    post: "produits",
});

const currentState = ref("utilisateur")

</script>
<template>
    <div>
        <div v-if="userStore.isAdmin">
            <div class="header">
                <h2 class="titre">Page d'administration</h2>
                <nav>
                    <ul class="states">
                        <li v-for="state in states" @click="currentState=state" class="state">
                            <button class="onglet page-admin-button" :class="{stateselected: currentState==state}">{{  state }}</button>
                        </li>
                    </ul>
                </nav>
            </div>
            
            <div class="content">
                <div v-if="currentState == states.user">
                    <userAdmin></userAdmin>
                </div>
                <div v-else-if="currentState == states.post">
                    <productAdmin></productAdmin>
                </div>
            </div>
        </div>
        <div v-else>
            Vous n'êtes pas supposé avoir accès à cette page.
            Normalement vous ne pourrez pas faire grand chose.
            Merci de reporter ce bug aux créateurs du site.
        </div>
    </div>
</template>