<script setup>
    import navbar from '../components/header.vue'
    import item from '../components/item.vue'   
    import { ref, watch } from 'vue'

    const studios = ref(null)

    async function fetchData() {
        studios.value = null
        const res = await fetch(
            `http://51.68.91.213/info9/Back/products/get_studios.php`,{
                credentials: "include"
            }
        )
        studios.value = await res.json()

        // Attendre la résolution de toutes les promesses de fetchTags
        await Promise.all(studios.value.map(async (studio) => {
            studio.image = `http://51.68.91.213/info9/Back/products/get_image.php?id=${studio.id_product}`
            studio.tags = await fetchTags(studio.id_product)
        }))
        console.log(studios.value)
    }

    async function fetchTags(id){
        const res = await fetch(
            `http://51.68.91.213/info9/Back/products/get_tag_by_product.php?id=${id}`,{
                credentials: "include"
            }
        )
        return await res.json()
    }

    fetchData()


</script>


<template>
    <navbar :loc = "'louer_app'"></navbar>
    <p>barre de recherche + calendrier</p>
    <main>
        <div v-for ="studio in studios">
            <item :name = "studio['name']" :tags = "studio['tags']" :prix = "studio['price']" :image = "studio['image']"></item>
        </div>
        </main>
    <p>footer</p>
</template>
