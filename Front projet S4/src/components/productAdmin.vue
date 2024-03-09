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
                type
            </td>
            <td>
                description
            </td>
            <td>
                prix
            </td>
            <td>
                photo
            </td>
        </tr>
        <tr v-for="produit in produits">
            <td>
                {{ produit[0] }}
            </td>
            <td>
                <input type="text" v-model="produit[1]"></input>
            </td>
            <td>
                <select name="category" v-model="produit[2]">
                    <option value="camera">Camera</option>
                    <option value="studio">Studio</option>
                </select>
            </td>
            <td>
                <input type="text" v-model="produit[3]"></input>
            </td>
            <td>
                <input type="text" v-model="produit[4]"></input>
            </td>
            <td>
                <div class="image-container">
                    <img class="image" :src="produit['image']">
                </div>
                <input type="file" ref="fileInputs" @change="handleFileChange($event, produit[0])" multiple />

            </td>
            <td>
                <button @click="modifierProduit(produit[0], produit[1], produit[2], produit[3], produit[4])">
                    Modifier
                </button>
            </td>
            <td>
                <button @click="supprimerProduit(produit[0])">
                    X
                </button>
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
        <input type="file" id="image" multiple />
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
const fileInputs = ref([]);

async function recupereProduits() {
    await fetch("http://51.68.91.213/info9/Back/products/get_all_products.php", {
        credentials: 'include'
    }).then((Response) => {
        return Response.json()
    }).then((data) => {
        produits.value = data
    })
    await Promise.all(produits.value.map(async (item) => {
        item.image = `http://51.68.91.213/info9/Back/products/get_image.php?id=${item[0]}`
    }))
    console.log(produits)
}
function handleFileChange(event, produitId) {
    const file = event.target.files[0];
    fileInputs.value[produitId] = file;
}
async function modifierProduit(id, nom, type, description, prix) {
    const formData = new FormData();
    const fichier = fileInputs.value[id];
    console.log(id)
    formData.append("id", id);
    formData.append("nom", nom);
    formData.append("type", type);
    formData.append("description", description);
    formData.append("prix", prix);
    formData.append("fichier", fichier);
    await fetch("http://51.68.91.213/info9/Back/products/update_product.php", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        credentials: 'include',
        body: formData
    })
    recupereProduits()

}

async function supprimerProduit(id) {
    await fetch("http://51.68.91.213/info9/Back/products/delete_product.php?id=" + id, {
        credentials: 'include'
    })
    recupereProduits()

}
async function ajoutProduit() {
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
        body: formData
    })
        .then((Response) => {
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

.image-container {
    width: 200px;
    height: 200px;
    overflow: hidden;
    /* Pour cacher toute partie de l'image qui dépasse du conteneur */
}

.image {
    width: 100%;
    /* Pour que l'image occupe tout l'espace du conteneur */
    height: 100%;
    /* Pour que l'image occupe tout l'espace du conteneur */
    object-fit: cover;
    /* Recadre l'image pour remplir le conteneur en conservant les proportions */
    object-position: center;
    /* Centre l'image à l'intérieur du conteneur */
}
</style>
