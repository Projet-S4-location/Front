<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user';

const userStore = useUserStore()
const username = ref('');
const password = ref('');

const utilisateurs = ref(null);

function recupereUtilisateurs (){
    fetch("http://51.68.91.213/info9/Back/users/get_users.php",{
        credentials: 'include'
    }).then((Response)=>{
        return Response.json()
    }).then((data)=>{
        utilisateurs.value = data
    })
}
async function supprimerUtilisateur(id){
    await fetch("http://51.68.91.213/info9/Back/users/delete_user.php?id=" + id,{
        credentials: 'include'
    })
    recupereUtilisateurs()

}
async function inscription (){ 
    // Vous pouvez implémenter ici la logique de connexion, par exemple, envoyer les données à votre API
    console.log('Nom d\'utilisateur:', username.value);
    console.log('Mot de passe:', password.value);
    await fetch("http://51.68.91.213/info9/Back/users/inscription.php", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        credentials: 'include',
        body: JSON.stringify({
	        "username": username.value,
            "password": password.value
        })
    }).then((Response)=>{
        console.log(Response)
    })
    // Réinitialiser les champs après la soumission
    username.value = ''
    password.value = ''
    recupereUtilisateurs()
}
recupereUtilisateurs()
</script>

<template>
    <div class="admin-page">
        <table class="user-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nom d'utilisateur</th>
                    <th>Permission</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="utilisateur in utilisateurs">
                    <td>{{ utilisateur["0"] }}</td>
                    <td>{{ utilisateur["1"] }}</td>
                    <td>{{ utilisateur["2"] }}</td>
                    <td>
                        <button class="delete-button" @click="supprimerUtilisateur(utilisateur[0])">Supprimer</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="add-user-form" v-if="userStore.isAdmin">
            <h2>Ajouter un utilisateur</h2>
            <form @submit.prevent="inscription">
                <div class="form-group">
                    <label for="username">Nom d'utilisateur:</label>
                    <input type="text" v-model="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Mot de passe:</label>
                    <input type="password" v-model="password" required>
                </div>
                <button type="submit">Inscrire</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
.admin-page {
    max-width: 800px;
    margin: 0 auto;
}

.user-table {
    width: 100%;
    border-collapse: collapse;
}

.user-table th,
.user-table td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ccc;
}

.user-table th {
    background-color: #f2f2f2;
}

.delete-button {
    background-color: #ff5722;
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.delete-button:hover {
    background-color: #d84315;
}

.add-user-form {
    background-color: #f9f9f9;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    margin: 40px auto; 
    max-width: 400px; 
    height: 300px; 
}

.add-user-form h2 {
    margin-top: 0;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type="text"],
input[type="password"],
button {
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    box-sizing: border-box;
}

button {
    background-color: #007bff; /* Changement de couleur */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3; /* Changement de couleur au survol */
}
</style>
