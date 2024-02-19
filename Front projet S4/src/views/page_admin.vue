<template>
    <form v-if="userStore.isAdmin" @submit.prevent="handleSubmit">
      <h2>Incrire un utilisateur</h2>
      <label for="username">Nom d'utilisateur:</label>
      <input type="text" v-model="username" required>
  
      <label for="password">Mot de passe:</label>
      <input type="password" v-model="password" required>
  
      <button type="submit">Se connecter</button>
    </form>
  </template>
  
<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user';

const userStore = useUserStore()
const username = ref('');
const password = ref('');
  
      
  
async function handleSubmit (){ 
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
    })
    // Réinitialiser les champs après la soumission
    username.value = ''
    password.value = ''
}
  
</script>
  
  <style scoped>
  form {
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
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
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  