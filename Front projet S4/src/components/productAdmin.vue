
<template>
<table>
    <tr>
        <td>
            id
        </td>
        <td>
            nom
        </td>
        <td>
            categorie
        </td>
        <td>
            description
        </td>
        <td>
            prix
        </td>
    </tr>
    <tr v-for="produit in produits">
        <td>
            {{ produit["0"] }}
        </td>
        <td>
            {{ produit["1"] }}
        </td>
        <td>
            {{ produit["2"] }}
        </td>
        <td>
            {{ produit["3"] }}
        </td>
        <td>
            {{ produit["4"] }}
        </td>
        <td @click="supprimerProduit(produit['0'])">
            X
        </td>
    </tr>
</table>
<form v-if="userStore.isAdmin" @submit.prevent="ajoutProduit">
      <h2>Ajouter un produit</h2>
      <label for="name">Nom du produit:</label>
      <input type="text" v-model="nom" required>
  
      <label for="type">Type:</label>
      <select name="type" v-model="type">
        <option value="">--Choisissez une option--</option>
        <option value="camera">Camera</option>
        <option value="studio">Studio</option>
      </select>
      <label for="description">Description:</label>
      <input type="text" v-model="description" required>
      <label for="prix">Prix:</label>
      <input type="text" v-model="prix" required>
      <label for="image">Image:</label>
      <input type="file" id="image" multiple/>
      <button type="submit">Inscrire</button>
      
</form>
</template>
  
<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user';

const userStore = useUserStore()

const nom = ref('');
const type = ref('');
const description = ref('');
const prix = ref('');

const produits = ref();

function recupereProduits (){
    fetch("http://51.68.91.213/info9/Back/products/get_all_products.php",{
        credentials: 'include'
    }).then((Response)=>{
        return Response.json()
    }).then((data)=>{
        produits.value = data
    })
}

async function supprimerProduit(id){
    await fetch("http://51.68.91.213/info9/Back/products/delete_product.php?id=" + id,{
        credentials: 'include'
    })
    recupereProduits()

}

async function ajoutProduit (){ 
    // Vous pouvez implémenter ici la logique de connexion, par exemple, envoyer les données à votre API
    console.log('nom:', nom.value);
    console.log('type:', type.value);
    console.log('description:', description.value);
    console.log('prix:', prix.value);

    const fichier = document.getElementById("image");

    const formData = new FormData();
    formData.append("nom", nom.value);
    formData.append("type", type.value);
    formData.append("description", description.value);
    formData.append("prix", prix.value);
    formData.append("fichier", fichier.files[0]);

    await fetch("http://51.68.91.213/info9/Back/products/add_product.php", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        credentials: 'include',
        body: formData})
        .then((Response)=>{
        console.log(Response)
    })
    // Réinitialiser les champs après la soumission
    nom.value = ''
    type.value = ''
    description.value = ''
    prix.value = ''
    recupereProduits()
}
recupereProduits()

</script>
  
<style scoped>
form {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.container {
  display: flex;
  
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
